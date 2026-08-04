import type { BlogPost, Guide, Problem, PropertyType } from "@/types/content";
import type { Area, Landmark, Location } from "@/types/location";
import type { Service, ServiceCategory } from "@/types/service";

export type DataStore = {
  services: Service[];
  categories: ServiceCategory[];
  locations: Location[];
  geoNodes: Location[];
  areas: Area[];
  landmarks: Landmark[];
  propertyTypes: PropertyType[];
  problems: Problem[];
  guides: Guide[];
  blogPosts: BlogPost[];
};

let store: DataStore | null = null;

export function setDataStore(next: DataStore) {
  store = next;
}

export function getDataStore(): DataStore | null {
  return store;
}

export function clearDataStore() {
  store = null;
}
