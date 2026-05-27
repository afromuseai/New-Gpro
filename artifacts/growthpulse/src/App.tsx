import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FirebaseClientProvider } from "@/firebase";
import NotFound from "@/pages/not-found";

import HomePage from "@/app/page";
import LoginPage from "@/app/login/page";
import DashboardLayout from "@/app/dashboard/layout";
import DashboardOverviewPage from "@/app/dashboard/page";
import AccountsPage from "@/app/dashboard/accounts/page";
import AnalyticsPage from "@/app/dashboard/analytics/page";
import AudiencePage from "@/app/dashboard/audience/page";
import BillingPage from "@/app/dashboard/billing/page";
import BotsPage from "@/app/dashboard/bots/page";
import CalendarPage from "@/app/dashboard/calendar/page";
import CampaignsPage from "@/app/dashboard/campaigns/page";
import CrisisPage from "@/app/dashboard/crisis/page";
import EngagementPage from "@/app/dashboard/engagement/page";
import IntegrityPage from "@/app/dashboard/integrity/page";
import MediaPage from "@/app/dashboard/media/page";
import SettingsPage from "@/app/dashboard/settings/page";

const queryClient = new QueryClient();

const DASHBOARD_PAGES: Array<{ path: string; component: React.ComponentType }> = [
  { path: "/dashboard", component: DashboardOverviewPage },
  { path: "/dashboard/accounts", component: AccountsPage },
  { path: "/dashboard/analytics", component: AnalyticsPage },
  { path: "/dashboard/audience", component: AudiencePage },
  { path: "/dashboard/billing", component: BillingPage },
  { path: "/dashboard/bots", component: BotsPage },
  { path: "/dashboard/calendar", component: CalendarPage },
  { path: "/dashboard/campaigns", component: CampaignsPage },
  { path: "/dashboard/crisis", component: CrisisPage },
  { path: "/dashboard/engagement", component: EngagementPage },
  { path: "/dashboard/integrity", component: IntegrityPage },
  { path: "/dashboard/media", component: MediaPage },
  { path: "/dashboard/settings", component: SettingsPage },
];

function DashboardRouter({ Component }: { Component: React.ComponentType }) {
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      {DASHBOARD_PAGES.map((p) => (
        <Route key={p.path} path={p.path}>
          <DashboardRouter Component={p.component} />
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseClientProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </FirebaseClientProvider>
    </QueryClientProvider>
  );
}

export default App;
