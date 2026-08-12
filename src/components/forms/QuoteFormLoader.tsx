import { QuoteForm } from "@/components/forms/QuoteForm";
import { getLocations, getServices } from "@/lib/data/repositories";

/** Server wrapper — keeps heavy location/service data out of the client bundle. */
export function QuoteFormLoader() {
  const services = getServices({ publishedOnly: true }).map((service) => ({
    id: service.id,
    name: service.name,
  }));
  const locations = getLocations({ publishedOnly: true, servedOnly: true }).map((location) => ({
    id: location.id,
    name: location.name,
  }));

  return <QuoteForm services={services} locations={locations} />;
}
