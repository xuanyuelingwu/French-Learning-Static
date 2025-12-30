import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVocabulary } from "@/hooks/useData";
import { useMemo } from "react";
import { Loader2, BookOpen } from "lucide-react";

export default function PartOfSpeech() {
  const { data: allVocabulary, loading: isLoading } = useVocabulary();

  // 按词性分类
  const categorizedVocab = useMemo(() => {
    if (!allVocabulary) return {
      nounMasculine: [],
      nounFeminine: [],
      verb: [],
      adjective: [],
      adverb: [],
      pronoun: [],
      preposition: [],
      other: []
    };

    const categories = {
      nounMasculine: [] as typeof allVocabulary,
      nounFeminine: [] as typeof allVocabulary,
      verb: [] as typeof allVocabulary,
      adjective: [] as typeof allVocabulary,
      adverb: [] as typeof allVocabulary,
      pronoun: [] as typeof allVocabulary,
      preposition: [] as typeof allVocabulary,
      other: [] as typeof allVocabulary
    };

    allVocabulary.forEach(vocab => {
      const pos = vocab.partOfSpeech?.toLowerCase() || "";
      
      if (pos.includes("n.m")) {
        categories.nounMasculine.push(vocab);
      } else if (pos.includes("n.f")) {
        categories.nounFeminine.push(vocab);
      } else if (pos.includes("v.") || pos.includes("动词")) {
        categories.verb.push(vocab);
      } else if (pos.includes("adj") || pos.includes("形容词")) {
        categories.adjective.push(vocab);
      } else if (pos.includes("adv") || pos.includes("副词")) {
        categories.adverb.push(vocab);
      } else if (pos.includes("pron") || pos.includes("代词")) {
        categories.pronoun.push(vocab);
      } else if (pos.includes("prép") || pos.includes("prep") || pos.includes("介词")) {
        categories.preposition.push(vocab);
      } else if (pos) {
        categories.other.push(vocab);
      }
    });

    return categories;
  }, [allVocabulary]);

  const VocabCard = ({ vocab }: { vocab: NonNullable<typeof allVocabulary>[0] }) => (
    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="french-text text-lg font-medium">{vocab.french}</span>
            {vocab.partOfSpeech && (
              <Badge variant="secondary" className="text-xs">
                {vocab.partOfSpeech}
              </Badge>
            )}
          </div>
          {vocab.phonetic && (
            <div className="phonetic text-sm text-muted-foreground mt-1">
              [{vocab.phonetic}]
            </div>
          )}
        </div>
      </div>
      <div className="text-sm text-foreground mb-2">{vocab.chinese}</div>
      {vocab.exampleFr && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="text-sm french-text text-muted-foreground italic">
            {vocab.exampleFr}
          </div>
          {vocab.exampleZh && (
            <div className="text-xs text-muted-foreground mt-1">
              {vocab.exampleZh}
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
        <BookOpen className="w-3 h-3" />
        <span>{vocab.unit} {vocab.lesson}</span>
      </div>
    </div>
  );

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
          <h1 className="text-4xl font-bold mb-2">词性分类</h1>
          <p className="text-muted-foreground">
            按照词性系统分类的词汇库
          </p>
        </div>

        <Tabs defaultValue="noun-m" className="w-full">
          <TabsList className="w-full justify-start flex-wrap h-auto mb-6">
            <TabsTrigger value="noun-m">
              名词·阳性 ({categorizedVocab.nounMasculine.length})
            </TabsTrigger>
            <TabsTrigger value="noun-f">
              名词·阴性 ({categorizedVocab.nounFeminine.length})
            </TabsTrigger>
            <TabsTrigger value="verb">
              动词 ({categorizedVocab.verb.length})
            </TabsTrigger>
            <TabsTrigger value="adjective">
              形容词 ({categorizedVocab.adjective.length})
            </TabsTrigger>
            <TabsTrigger value="adverb">
              副词 ({categorizedVocab.adverb.length})
            </TabsTrigger>
            <TabsTrigger value="pronoun">
              代词 ({categorizedVocab.pronoun.length})
            </TabsTrigger>
            <TabsTrigger value="preposition">
              介词 ({categorizedVocab.preposition.length})
            </TabsTrigger>
            {categorizedVocab.other.length > 0 && (
              <TabsTrigger value="other">
                其他 ({categorizedVocab.other.length})
              </TabsTrigger>
            )}
          </TabsList>

          {/* 阳性名词 */}
          <TabsContent value="noun-m">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>阳性名词 (Nom masculin)</span>
                  <Badge variant="outline">n.m.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  阳性名词前使用定冠词 le 或不定冠词 un
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.nounMasculine.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无阳性名词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.nounMasculine.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 阴性名词 */}
          <TabsContent value="noun-f">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>阴性名词 (Nom féminin)</span>
                  <Badge variant="outline">n.f.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  阴性名词前使用定冠词 la 或不定冠词 une
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.nounFeminine.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无阴性名词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.nounFeminine.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 动词 */}
          <TabsContent value="verb">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>动词 (Verbe)</span>
                  <Badge variant="outline">v.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  法语动词需要根据人称和时态进行变位
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.verb.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无动词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.verb.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 形容词 */}
          <TabsContent value="adjective">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>形容词 (Adjectif)</span>
                  <Badge variant="outline">adj.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  形容词需要与所修饰的名词在性和数上保持一致
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.adjective.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无形容词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.adjective.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 副词 */}
          <TabsContent value="adverb">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>副词 (Adverbe)</span>
                  <Badge variant="outline">adv.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  副词用于修饰动词、形容词或其他副词，不发生性数变化
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.adverb.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无副词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.adverb.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 代词 */}
          <TabsContent value="pronoun">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>代词 (Pronom)</span>
                  <Badge variant="outline">pron.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  代词用于代替名词，包括人称代词、指示代词、疑问代词等
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.pronoun.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无代词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.pronoun.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 介词 */}
          <TabsContent value="preposition">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>介词 (Préposition)</span>
                  <Badge variant="outline">prép.</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  介词用于表示名词、代词与其他词之间的关系
                </p>
              </CardHeader>
              <CardContent>
                {categorizedVocab.preposition.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无介词
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.preposition.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 其他 */}
          {categorizedVocab.other.length > 0 && (
            <TabsContent value="other">
              <Card>
                <CardHeader>
                  <CardTitle>其他词性</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedVocab.other.map(vocab => (
                      <VocabCard key={vocab.id} vocab={vocab} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
