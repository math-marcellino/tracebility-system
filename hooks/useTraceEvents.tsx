import useSWR from "swr";
import { ethers, Event } from "ethers";
import { contractABIInterface } from "../abi/contractInterface";

export type TraceEventsRequest = {
    contractAddress: string,
    provider: ethers.providers.BaseProvider;
}

export type TraceEventsResult = {
    date: string,
    itemID: number,
    step: number,
    verifiers: string,
    halal: boolean;
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
    
    const result:Array<TraceEventsResult> = data! && data?.map((item) => {
        const date = new Date(item.args?._time.toNumber() * 1000)
        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "short", year: "numeric", minute: "numeric" }).format(date);
        const event:TraceEventsResult = {
            date: formattedDate,
            itemID: item.args?._itemID.toNumber(),
            step: item.args?._step.toNumber()+1,
            verifiers: item.args?.verifiers,
            halal: item.args?._halal
        }
        return event;
    })
    
    return { 
        data: result, 
        isLoading: !data && !error,
        error: error
    }
}