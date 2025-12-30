import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpen, BookText, Languages, FileText, TrendingUp, Heart } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookText,
      title: "词汇库",
      description: "按单元和课文分类的完整词汇表，包含音标和详细释义",
      path: "/vocabulary",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Languages,
      title: "语法知识",
      description: "系统的语法点讲解，包括倒装句、命令式、疑问句等",
      path: "/grammar",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: FileText,
      title: "动词变位",
      description: "第一、二、三组动词的完整变位表和规则说明",
      path: "/verbs",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: BookOpen,
      title: "课文对照",
      description: "10篇课文的法语原文和中文翻译逐句对照",
      path: "/texts",
      color: "text-orange-600 dark:text-orange-400"
    },

  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              新无国界法语
              <span className="block text-primary mt-2">学习助手</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Le Nouveau Sans Frontières · Unité 1 & 2
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              系统化学习第一、二单元的词汇、语法和课文内容，助力您的法语期末考试
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/vocabulary">
                <a>
                  <Button size="lg" className="gap-2">
                    <BookText className="w-5 h-5" />
                    开始学习词汇
                  </Button>
                </a>
              </Link>
              <Link href="/grammar">
                <a>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Languages className="w-5 h-5" />
                    浏览语法知识
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.path} href={feature.path}>
                  <a>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary">424</div>
                  <div className="text-sm text-muted-foreground mt-2">词汇总数</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">32</div>
                  <div className="text-sm text-muted-foreground mt-2">动词变位</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground mt-2">语法点</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground mt-2">课文篇数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


    </Layout>
  );
}
