import useSWR from "swr";
import { ethers, Event } from "ethers";
import { contractABIInterface } from "../abi/contractInterface";

export type TraceEventsRequest = {
    contractAddress: string,
    provider: ethers.providers.BaseProvider;
}

const TraceEventsFetcher = (args: TraceEventsRequest): Promise<Array<Event>> => {
    const tracebilityContract = new ethers.Contract(args.contractAddress, contractABIInterface, args.provider);

    // Create Filter for querying events from smart contract
    const filter = tracebilityContract.filters.Trace()
      
    // Query events from smart contract (currently displayed on console.log)
    const eventsData = tracebilityContract.queryFilter(filter)

    return eventsData;
}

export function useTraceEvents(req: TraceEventsRequest){
    const { data, error } = useSWR<Array<Event>, Error>(
        { contractAddress: req.contractAddress, provider: req.provider },
        TraceEventsFetcher
    );
    return { 
        data: data, 
        isLoading: !data && !error,
        error: error
    }
}