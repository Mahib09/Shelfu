import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CardComponent = ({ Icon, Title, data, comparisondata }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{Title}</CardTitle>
        {Icon}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">{comparisondata}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
