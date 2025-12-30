import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGrammar } from "@/hooks/useData";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

export default function Grammar() {
  const { data: grammarList, loading: isLoading } = useGrammar();

  // 按分类分组
  const groupedGrammar = useMemo(() => {
    if (!grammarList) return {};
    const groups: Record<string, typeof grammarList> = {};
    grammarList.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [grammarList]);

  const categoryLabels: Record<string, string> = {
    "sentence_structure": "句型结构",
    "verb_tense": "动词时态",
    "question": "疑问句",
    "negation": "否定句",
    "article": "冠词",
    "pronoun": "代词",
    "other": "其他"
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
          <h1 className="text-4xl font-bold mb-2">语法知识库</h1>
          <p className="text-muted-foreground">
            系统学习第一、二单元的语法点
          </p>
        </div>

        {/* Grammar Content */}
        <div className="space-y-6">
          {Object.entries(groupedGrammar).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{categoryLabels[category] || category}</span>
                  <Badge variant="outline">{items.length} 个语法点</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {items.map((grammar, index) => (
                    <AccordionItem key={grammar.id} value={`item-${grammar.id}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{grammar.unit}</Badge>
                          <span className="font-medium">{grammar.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {/* 内容 */}
                          {grammar.content && (
                            <div>
                              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                                说明
                              </h4>
                              <div className="prose prose-sm max-w-none">
                                <p className="text-foreground whitespace-pre-wrap">
                                  {grammar.content}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* 例句 */}
                          {grammar.examples && (
                            <div>
                              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                                例句
                              </h4>
                              <div className="space-y-2">
                                {grammar.examples.split('\n').map((example, i) => {
                                  if (!example.trim()) return null;
                                  return (
                                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                                      <p className="french-text text-foreground">
                                        {example}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}


                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
