// Generated by https://quicktype.io

export interface DirectionsResponse {
  routes:    Route[];
  waypoints: Waypoint[];
  code:      string;
  uuid:      string;
}

export interface Route {
  weight_typical:   number;
  duration_typical: number;
  weight_name:      string;
  weight:           number;
  duration:         number;
  distance:         number;
  legs:             Leg[];
  geometry:         Geometry;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type:        Type;
}

export enum Type {
  LineString = "LineString",
}

export interface Leg {
  via_waypoints:    any[];
  admins:           Admin[];
  weight_typical:   number;
  duration_typical: number;
  weight:           number;
  duration:         number;
  steps:            Step[];
  distance:         number;
  summary:          string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1:        string;
}

export interface Step {
  intersections:    Intersection[];
  maneuver:         Maneuver;
  name:             string;
  weight_typical:   number;
  duration_typical: number;
  duration:         number;
  distance:         number;
  driving_side:     DrivingSide;
  weight:           number;
  mode:             Mode;
  ref?:             string;
  geometry:         Geometry;
  destinations?:    string;
}

export enum DrivingSide {
  Right = "right",
}

export interface Intersection {
  entry:              boolean[];
  bearings:           number[];
  duration?:          number;
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?:          boolean;
  admin_index:        number;
  out?:               number;
  weight?:            number;
  geometry_index:     number;
  location:           number[];
  in?:                number;
  turn_weight?:       number;
  turn_duration?:     number;
  toll_collection?:   TollCollection;
  tunnel_name?:       string;
  classes?:           string[];
  lanes?:             Lane[];
  traffic_signal?:    boolean;
}

export interface Lane {
  indications:       string[];
  valid:             boolean;
  active:            boolean;
  valid_indication?: string;
}

export interface MapboxStreetsV8 {
  class: Class;
}

export enum Class {
  Primary = "primary",
  Street = "street",
  Tertiary = "tertiary",
  Trunk = "trunk",
}

export interface TollCollection {
  type:  string;
  name?: string;
}

export interface Maneuver {
  type:           string;
  instruction:    string;
  bearing_after:  number;
  bearing_before: number;
  location:       number[];
  modifier?:      string;
}

export enum Mode {
  Driving = "driving",
}

export interface Waypoint {
  distance: number;
  name:     string;
  location: number[];
}
