import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { useVocabulary } from "@/hooks/useData";

export default function Vocabulary() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");

  const { data: allVocabulary, loading: isLoading } = useVocabulary();

  // 筛选词汇
  const filteredVocabulary = useMemo(() => {
    if (!allVocabulary) return [];

    return allVocabulary.filter((vocab) => {
      const matchesUnit = selectedUnit === "all" || vocab.unit === selectedUnit;
      const matchesLesson = selectedLesson === "all" || vocab.lesson === selectedLesson;
      const matchesSearch =
        !searchKeyword ||
        vocab.french.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        vocab.chinese.includes(searchKeyword) ||
        (vocab.partOfSpeech && vocab.partOfSpeech.includes(searchKeyword));

      return matchesUnit && matchesLesson && matchesSearch;
    });
  }, [allVocabulary, selectedUnit, selectedLesson, searchKeyword]);

  // 按课文分组
  const groupedByLesson = useMemo(() => {
    const groups: Record<string, typeof filteredVocabulary> = {};
    filteredVocabulary.forEach((vocab) => {
      const key = `${vocab.unit} ${vocab.lesson}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(vocab);
    });
    return groups;
  }, [filteredVocabulary]);

  // 获取可用的课文列表
  const availableLessons = useMemo(() => {
    if (!allVocabulary) return [];
    const lessons = allVocabulary
      .filter((v) => selectedUnit === "all" || v.unit === selectedUnit)
      .map((v) => v.lesson);
    return Array.from(new Set(lessons)).sort();
  }, [allVocabulary, selectedUnit]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">词汇库</h1>
          <p className="text-muted-foreground">
            按单元和课文分类的词汇表，共 {allVocabulary?.length || 0} 个词汇
          </p>
        </div>

        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="搜索法语单词、中文释义或词性..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedUnit}
                  onChange={(e) => {
                    setSelectedUnit(e.target.value);
                    setSelectedLesson("all");
                  }}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="all">全部单元</option>
                  <option value="U1">第一单元</option>
                  <option value="U2">第二单元</option>
                </select>
                <select
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                  disabled={selectedUnit === "all"}
                >
                  <option value="all">全部课文</option>
                  {availableLessons.map((lesson) => (
                    <option key={lesson} value={lesson}>
                      {lesson}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 词汇列表 */}
        {Object.keys(groupedByLesson).length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              没有找到匹配的词汇
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByLesson).map(([lessonKey, vocabs]) => (
              <Card key={lessonKey}>
                <CardHeader>
                  <CardTitle className="text-xl">{lessonKey}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {vocabs.map((vocab) => (
                      <div
                        key={vocab.id}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl font-serif text-primary">
                                {vocab.french}
                              </span>
                              {vocab.partOfSpeech && (
                                <Badge variant="outline" className="text-xs">
                                  {vocab.partOfSpeech}
                                </Badge>
                              )}
                              {vocab.phonetic && (
                                <span className="text-sm text-muted-foreground">
                                  [{vocab.phonetic}]
                                </span>
                              )}
                            </div>
                            <p className="text-base mb-2">{vocab.chinese}</p>
                            {vocab.exampleFr && (
                              <div className="mt-3 p-3 bg-muted/30 rounded-md">
                                <p className="text-sm italic text-muted-foreground mb-1">
                                  {vocab.exampleFr}
                                </p>
                                {vocab.exampleZh && (
                                  <p className="text-sm text-muted-foreground">
                                    {vocab.exampleZh}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
