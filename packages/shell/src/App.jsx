import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ProductsPage = React.lazy(() => import("app_products/ProductsPage"));
const BillingPage = React.lazy(() => import("app_billing/BillingPage"));

export function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/billing">Billing</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/billing">
              <React.Suspense fallback="loading">
                <BillingPage />
              </React.Suspense>
            </Route>
            <Route path="/">
              <React.Suspense fallback="loading">
                <ProductsPage />
              </React.Suspense>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
