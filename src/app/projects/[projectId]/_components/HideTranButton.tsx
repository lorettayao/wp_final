"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HideTranButton() {
  const [visibility, setVisibility] = useState("visible");
  return (
    visibility === "visible" ?
    <Button className="bg-blue-300 bg-opacity-80" onClick={() => setVisibility("invisivle")}>
      Hide Translation
    </Button>
    :
    <Button className="bg-blue-300 bg-opacity-80" onClick={() => setVisibility("visible")}>
      Show Translation
    </Button>
  );
}
