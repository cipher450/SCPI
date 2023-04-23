import React from "react";
import { Star } from "react-feather";
import { Divider } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
export default function ScpiCard({ obj }) {





  return (
    <a className="ScpiCard" href={"scpi/"+obj.slug}>
      <div className="ScpiCard--Header">
        <div className="flex gap-1 align-middle items-center">
          {obj.inOurSelection ? <Star size={24} fill="yellow" /> : ""}
          <span className="text-lg font-bold">{obj.title}</span>
        </div>
        <span className="text-sm">
          Gérée par <span className="text-blue-800"> {obj.agencyparent}</span>
        </span>
      </div>

      <div className="ScpiCard--Body">
         

        <div className="flex flex-col">
          <span className="mini-card">{obj.distributionRate}%</span>
          <span className="text-xs">TD 2022</span>
        </div>

        <div className="flex flex-col">
          <span className="mini-card">{obj.partPrice},00 €</span>
          <span className="text-xs">Prix de part</span>
        </div>
      </div>

      <div className="ScpiCard--Footer">
        <Divider />
        <a className="text-lg text-center " href={"scpi/"+obj.slug}>Plus de details</a>
      </div>
    </a>
  );
}
