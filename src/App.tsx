import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import {ArticlePage} from "./pages/Article";
import Portfolio from "./pages/Portfolio";
import ProjectBlog from "./pages/ProjectBlog";
import PlannerTime from "./pages/PlannerTime";
import Scantrak from "./pages/Scantrak";
import ScantrakPrivacy from "./pages/ScantrakPrivacy";
import Documentation, { DocArticlePage } from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/plannertime" element={<PlannerTime />} />
            <Route path="/portfolio/scantrak" element={<Scantrak />} />
            <Route path="/portfolio/scantrak/privacy" element={<ScantrakPrivacy />} />
            <Route path="/portfolio/:projectId" element={<ProjectBlog />} />
            <Route path="/documentazione" element={<Documentation />} />
            <Route path="/documentazione/:categoryId/:articleSlug" element={<DocArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
