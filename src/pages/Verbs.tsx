import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useVerbs } from "@/hooks/useData";
import { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";

export default function Verbs() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<"all" | "first" | "second" | "third">("all");

  const { data: allVerbs, loading: isLoading } = useVerbs();

  // 筛选和搜索
  const filteredVerbs = useMemo(() => {
    if (!allVerbs) return [];

    let filtered = allVerbs;

    // 按组筛选
    if (selectedGroup !== "all") {
      filtered = filtered.filter(v => v.group === selectedGroup);
    }

    // 搜索
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(v =>
        v.verb.toLowerCase().includes(keyword) ||
        v.chinese?.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  }, [allVerbs, selectedGroup, searchKeyword]);

  // 按组分组
  const groupedVerbs = useMemo(() => {
    const groups: Record<string, typeof filteredVerbs> = {
      first: [],
      second: [],
      third: []
    };
    filteredVerbs.forEach(verb => {
      groups[verb.group].push(verb);
    });
    return groups;
  }, [filteredVerbs]);

  const groupLabels = {
    first: "第一组动词（-er结尾）",
    second: "第二组动词（-ir结尾）",
    third: "第三组动词（不规则）"
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">动词变位表</h1>
          <p className="text-muted-foreground">
            第一、二、三组动词的现在时变位
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="搜索动词..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Group Filter */}
              <Tabs value={selectedGroup} onValueChange={(v) => setSelectedGroup(v as any)}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all">全部动词</TabsTrigger>
                  <TabsTrigger value="first">第一组</TabsTrigger>
                  <TabsTrigger value="second">第二组</TabsTrigger>
                  <TabsTrigger value="third">第三组</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Verb Conjugations */}
        {filteredVerbs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              没有找到匹配的动词
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {(Object.entries(groupedVerbs) as [keyof typeof groupLabels, typeof filteredVerbs][]).map(([group, verbs]) => {
              if (verbs.length === 0) return null;
              return (
                <Card key={group}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>{groupLabels[group]}</span>
                      <Badge variant="outline">{verbs.length} 个动词</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {verbs.map((verb) => (
                        <div
                          key={verb.id}
                          className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          {/* Verb Header */}
                          <div className="mb-4 pb-3 border-b border-border">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="french-text text-xl font-semibold text-primary">
                                {verb.verb}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {group === "first" ? "-er" : group === "second" ? "-ir" : "不规则"}
                              </Badge>
                            </div>
                            {verb.chinese && (
                              <div className="text-sm text-muted-foreground">
                                {verb.chinese}
                              </div>
                            )}
                          </div>

                          {/* Conjugation Table */}
                          <div className="space-y-2">
                            {[
                              { pronoun: "je", form: verb.je },
                              { pronoun: "tu", form: verb.tu },
                              { pronoun: "il/elle", form: verb.il },
                              { pronoun: "nous", form: verb.nous },
                              { pronoun: "vous", form: verb.vous },
                              { pronoun: "ils/elles", form: verb.ils }
                            ].map(({ pronoun, form }) => (
                              <div
                                key={pronoun}
                                className="flex items-center justify-between py-2 px-3 rounded bg-muted/30"
                              >
                                <span className="text-sm font-medium text-muted-foreground w-24">
                                  {pronoun}
                                </span>
                                <span className="french-text text-foreground font-medium">
                                  {form}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Notes */}
                          {verb.notes && (
                            <div className="mt-4 p-3 rounded-lg bg-accent/30 text-sm">
                              <p className="text-muted-foreground">{verb.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
