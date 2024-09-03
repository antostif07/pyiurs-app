import React from "react";
import { dehydrate } from "@tanstack/query-core";
import { getQueryClient } from "../lib/getQueryClient";
import Hydrate from "./Hydrate";

export default async function PokemonWrapper({children, getData}: Readonly<{
    children: React.ReactNode;
    getData: (filters?: string) => Promise<any>;
  }>) {
  const queryClient = getQueryClient();

  // @ts-ignore   
  await queryClient.prefetchQuery(GET_POKEMONS_KEY, getData);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      {
        children
      }
    </Hydrate>
  );
}