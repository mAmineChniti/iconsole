export type InstanceStatus =
  | "ACTIVE"
  | "SHUTOFF"
  | "ERROR"
  | "BUILD"
  | "DELETED";

export type ImageStatus = "active" | "queued" | "saving";

type ServiceStatus = "enabled" | "disabled";
type ServiceState = "up" | "down";

interface Server {
  id: string;
  name: string;
  status: InstanceStatus;
}

export type NovaServersResponse = Server[];

export interface NovaActionResponse {
  message: string;
}

interface Image {
  id: string;
  name: string;
  status: ImageStatus;
}

export type ImageListResponse = Image[];

export interface ProjectPingResponse {
  message: "Project service is working";
}

interface PlatformInfo {
  nodes: number;
  projects: number;
  users: number;
  hypervisor_errors: string[];
}

interface InstanceResources {
  total: number;
  ACTIVE: number;
  SHUTOFF: number;
  ERROR: number;
  OTHERS: number;
}

interface VolumeResources {
  total: number;
  available: number;
  "in-use": number;
  error: number;
  OTHERS: number;
}

interface CpuResources {
  used: number;
  total: number;
  unused: number;
  usage_percent: number;
}

interface RamResources {
  used: number;
  total: number;
  unused: number;
  usage_percent: number;
}

interface Resources {
  instances: InstanceResources;
  volumes: VolumeResources;
  cpu: CpuResources;
  ram: RamResources;
}

interface ComputeService {
  name: string;
  host: string;
  status: ServiceStatus;
  state: ServiceState;
}

interface NetworkService {
  name: string;
  host: string;
  alive: boolean;
}

export interface DashboardOverviewResponse {
  platform_info: PlatformInfo;
  resources: Resources;
  compute_services: ComputeService[];
  network_services: NetworkService[];
}
