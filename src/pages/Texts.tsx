import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTexts } from "@/hooks/useData";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Texts() {
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  
  const { data: allTexts, loading: isLoading } = useTexts();

  const filteredTexts = allTexts?.filter(text => 
    selectedUnit === "all" || text.unit === selectedUnit
  ) || [];

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
          <h1 className="text-4xl font-bold mb-2">课文对照翻译</h1>
          <p className="text-muted-foreground">
            第一、二单元的课文法中对照
          </p>
        </div>

        {/* Unit Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Tabs value={selectedUnit} onValueChange={setSelectedUnit}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">全部单元</TabsTrigger>
                <TabsTrigger value="U1">第一单元</TabsTrigger>
                <TabsTrigger value="U2">第二单元</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Texts List */}
        {filteredTexts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              暂无课文内容
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredTexts.map((text) => (
              <Card key={text.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{text.unit}</Badge>
                    <Badge variant="outline">{text.lesson}</Badge>
                    <span>{text.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* French Text */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-lg font-semibold">法语原文</h3>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <div className="french-text text-foreground whitespace-pre-wrap leading-relaxed">
                          {text.frenchText}
                        </div>
                      </div>
                    </div>

                    {/* Chinese Translation */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-secondary rounded-full"></div>
                        <h3 className="text-lg font-semibold">中文翻译</h3>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                          {text.chineseText}
                        </div>
                      </div>
                    </div>
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
