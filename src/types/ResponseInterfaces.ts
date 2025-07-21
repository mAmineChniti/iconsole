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

export interface AuthPingResponse {
  message: "auth ok";
}

export interface InstanceListItem {
  instance_name: string;
  image_name: string;
  ip_address: string;
  flavor: string;
  key_pair: string;
  status: string;
  availability_zone: string;
  task: string;
  power_state: string;
  age: string;
  id: string;
}

export type InstanceListResponse = InstanceListItem[];

export interface FlavorDetails {
  name: string;
  ram: string;
  vcpus: number;
  disk: string;
}

export interface ImageDetails {
  name: string;
  id: string;
}

export interface NetworkDetails {
  network: string;
  ip: string;
  type: string;
}

export interface VolumeDetails {
  id: string;
  name: string;
  size: string;
}

export interface InstanceDetailsResponse {
  id: string;
  name: string;
  status: string;
  locked: boolean;
  project_id: string;
  created_at: string;
  host: string;
  flavor: FlavorDetails;
  image: ImageDetails;
  networks: NetworkDetails[];
  security_groups: string[];
  volumes: VolumeDetails[];
  floating_ips: string[];
}

export interface VMCreateRequest {
  name: string;
  image_id: string;
  flavor_id: string;
  network_id: string;
  key_name: string;
  security_group: string;
  admin_password: string;
  admin_username: string;
}

export interface VMCreateResponse {
  status: "success";
  server: {
    id: string;
    name: string;
    status: string;
    admin_username: string;
    admin_password: string;
    ssh_key: string;
    floating_ip: string;
  };
}

export interface VMwareImportRequest {
  vm_name: string;
  description?: string;
  min_disk?: number;
  min_ram?: number;
  is_public?: boolean;
  flavor_id: string;
  network_id: string;
  key_name: string;
  security_group: string;
  admin_password?: string;
  vmdk_file: File;
}

export interface VMwareImportResponse {
  status: "success";
  image: {
    id: string;
    name: string;
  };
  server: {
    id: string;
    name: string;
    status: string;
    floating_ip: string;
  };
}

export interface ResourceFlavor {
  id: string;
  name: string;
}

export interface ResourceImage {
  id: string;
  name: string;
}

export interface ResourceNetwork {
  id: string;
  name: string;
}

export interface ResourceKeypair {
  name: string;
}

export interface ResourceSecurityGroup {
  name: string;
}

export interface ResourcesResponse {
  images: ResourceImage[];
  flavors: ResourceFlavor[];
  networks: ResourceNetwork[];
  keypairs: ResourceKeypair[];
  security_groups: ResourceSecurityGroup[];
}

export interface QemuImgCheckResponse {
  installed: boolean;
  version: string;
}

export interface ImageImportFromUrlResponse {
  message: string;
  image_id: string;
  visibility: string;
}

export interface UserPingResponse {
  message: "User service OK";
}

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
