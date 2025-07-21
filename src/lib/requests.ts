import { env } from "@/env";
import type {
  AuthPingResponse,
  DashboardOverviewResponse,
  ImageImportFromUrlResponse,
  InstanceDetailsResponse,
  InstanceListResponse,
  NovaActionResponse,
  ProjectPingResponse,
  QemuImgCheckResponse,
  ResourcesResponse,
  UserPingResponse,
  VMCreateRequest,
  VMCreateResponse,
  VMwareImportResponse,
} from "@/types/ResponseInterfaces";
import { TFetchClient } from "@thatguyjamal/type-fetch";

const client = new TFetchClient();
const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;
const API_CONFIG = {
  INFRA: {
    BASE_URL: NEXT_PUBLIC_BACKEND ?? "http://127.0.0.1:8000/api/v1",
    ENDPOINTS: {
      AUTH_PING: "/auth/ping",
      INSTANCES: "/nova/instances",
      INSTANCE_DETAILS: "/nova/servers",
      CREATE_VM: "/nova/create-vm",
      IMPORT_VMWARE: "/nova/import-vmware-vm",
      START_INSTANCE: "/nova/start",
      STOP_INSTANCE: "/nova/stop",
      REBOOT_INSTANCE: "/nova/reboot",
      DELETE_INSTANCE: "/nova/delete",
      RESOURCES: "/nova/resources",
      CHECK_QEMU_IMG: "/nova/check-qemu-img",
      IMPORT_FROM_URL: "/image/images/import-from-url",
      OVERVIEW: "/dashboard/overview",
      PING_PROJECT: "/projects/ping",
      USER_PING: "/users/ping",
    },
  },
} as const;

export const InfraService = {
  async pingAuth(): Promise<AuthPingResponse> {
    const result = await client.get<AuthPingResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.AUTH_PING,
    );
    if (result.error) {
      throw new Error(`Error pinging auth service: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from auth ping endpoint");
    }
    return result.data;
  },

  async listInstances(): Promise<InstanceListResponse> {
    const result = await client.get<InstanceListResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.INSTANCES,
    );
    if (result.error) {
      throw new Error(`Error fetching instances: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from instances endpoint");
    }
    return result.data;
  },

  async getInstanceDetails(
    instanceId: string,
  ): Promise<InstanceDetailsResponse> {
    const result = await client.get<InstanceDetailsResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.INSTANCE_DETAILS +
        `/${instanceId}`,
    );
    if (result.error) {
      throw new Error(
        `Error fetching instance details: ${result.error.message}`,
      );
    }
    if (!result.data) {
      throw new Error("No data received from instance details endpoint");
    }
    return result.data;
  },

  async createVM(vmData: VMCreateRequest): Promise<VMCreateResponse> {
    const result = await client.post<VMCreateResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.CREATE_VM,
      { type: "json", data: vmData },
    );
    if (result.error) {
      throw new Error(`Error creating VM: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from create VM endpoint");
    }
    return result.data;
  },

  async importVMwareVM(formData: FormData): Promise<VMwareImportResponse> {
    const result = await client.post<VMwareImportResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.IMPORT_VMWARE,
      { type: "form", data: formData },
    );
    if (result.error) {
      throw new Error(`Error importing VMware VM: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from import VMware VM endpoint");
    }
    return result.data;
  },

  async listResources(): Promise<ResourcesResponse> {
    const result = await client.get<ResourcesResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.RESOURCES,
    );
    if (result.error) {
      throw new Error(`Error fetching resources: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from resources endpoint");
    }
    return result.data;
  },

  async checkQemuImg(): Promise<QemuImgCheckResponse> {
    const result = await client.get<QemuImgCheckResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.CHECK_QEMU_IMG,
    );
    if (result.error) {
      throw new Error(`Error checking QEMU-IMG: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from QEMU-IMG check endpoint");
    }
    return result.data;
  },

  async startInstance(instanceId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.START_INSTANCE +
        `/${instanceId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error starting instance: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from start instance endpoint");
    }
    return result.data;
  },

  async stopInstance(instanceId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.STOP_INSTANCE +
        `/${instanceId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error stopping instance: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from stop instance endpoint");
    }
    return result.data;
  },

  async rebootInstance(instanceId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.REBOOT_INSTANCE +
        `/${instanceId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error rebooting instance: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from reboot instance endpoint");
    }
    return result.data;
  },

  async deleteInstance(instanceId: string): Promise<NovaActionResponse> {
    const result = await client.delete<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.DELETE_INSTANCE +
        `/${instanceId}`,
    );
    if (result.error) {
      throw new Error(`Error deleting instance: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from delete instance endpoint");
    }
    return result.data;
  },

  async importImageFromUrl(
    imageUrl: string,
    imageName: string,
    visibility = "private",
  ): Promise<ImageImportFromUrlResponse> {
    const result = await client.post<ImageImportFromUrlResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.IMPORT_FROM_URL +
        `?image_url=${encodeURIComponent(imageUrl)}&image_name=${encodeURIComponent(imageName)}&visibility=${visibility}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(
        `Error importing image from URL: ${result.error.message}`,
      );
    }
    if (!result.data) {
      throw new Error("No data received from import image endpoint");
    }
    return result.data;
  },

  async getOverview(): Promise<DashboardOverviewResponse> {
    const result = await client.get<DashboardOverviewResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.OVERVIEW,
    );
    if (result.error) {
      throw new Error(`Error fetching overview: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from overview endpoint");
    }
    return result.data;
  },

  async pingProject(): Promise<ProjectPingResponse> {
    const result = await client.get<ProjectPingResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.PING_PROJECT,
    );
    if (result.error) {
      throw new Error(`Error pinging project: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from ping project endpoint");
    }
    return result.data;
  },

  async pingUser(): Promise<UserPingResponse> {
    const result = await client.get<UserPingResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.USER_PING,
    );
    if (result.error) {
      throw new Error(`Error pinging user service: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from user ping endpoint");
    }
    return result.data;
  },
};
