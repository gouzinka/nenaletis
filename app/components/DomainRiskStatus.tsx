"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useFetchData from "@/hooks/useFetchData";
import useParseCsvData from "@/hooks/useParseCsvData";

interface DomainStatusProps {
  domainName: string;
}

export interface DomainData {
  domain: string;
  riskStatus: string;
}

const DomainStatus: React.FC<DomainStatusProps> = ({ domainName }) => {
  const url =
    "https://www.coi.cz/userdata/files/dokumenty-ke-stazeni/open-data/rizikove-seznam.csv";
  const { data, isLoading, error } = useFetchData(url);

  const parseFunction = useCallback(
    (record: string[]): DomainData => ({
      domain: record[0],
      riskStatus: record[1]?.replace(/^'|'$/g, ""),
    }),
    [],
  );

  const parsedData = useParseCsvData<DomainData>(data, parseFunction, {
    delimiter: ";",
  });

  const domainData = parsedData?.find(
    (record) => record.domain.toLowerCase() === domainName.toLowerCase(),
  );

  if (isLoading) return <p>Ověřuji&#8230;</p>;
  if (error) return <p>Vyskytla se chyba: {error}</p>;
  if (!domainData)
    return <p>Doména se na seznamu rizikových e-shopů nenachází.</p>;

  return (
    <div>
      <Image
        className="mb-12 block mx-auto"
        src="/error.svg"
        alt=""
        width={90}
        height={90}
        priority
      />
      <p>{domainData.riskStatus}</p>
    </div>
  );
};

export default DomainStatus;
