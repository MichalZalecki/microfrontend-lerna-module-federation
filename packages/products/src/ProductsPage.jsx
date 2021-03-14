import React, { useState } from "react";
import { Button } from "@michalzalecki/ds/components/Button";

const UpsellModal = React.lazy(() => import("app_billing/UpsellModal"));

export default function ProductsPage() {
  const [showUpsell, setShowUpsell] = useState();

  return (
    <div>
      <h1>Products Page</h1>
      <Button onClick={() => setShowUpsell(true)}>Business</Button>
      {showUpsell && (
        <React.Suspense fallback="LOADING">
          <div>
            <UpsellModal />
          </div>
        </React.Suspense>
      )}
    </div>
  );
}
