import { env } from "@/env";
import type {
  DashboardOverviewResponse,
  ImageListResponse,
  NovaActionResponse,
  NovaServersResponse,
  ProjectPingResponse,
} from "@/types/ResponseInterfaces";
import { TFetchClient } from "@thatguyjamal/type-fetch";

const client = new TFetchClient();
const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;
const API_CONFIG = {
  INFRA: {
    BASE_URL: NEXT_PUBLIC_BACKEND ?? "http://127.0.0.1:8000/api/v1",
    ENDPOINTS: {
      SERVERS: "/nova/servers",
      START_SERVER: "/nova/start",
      STOP_SERVER: "/nova/stop",
      REBOOT_SERVER: "/nova/reboot",
      DELETE_SERVER: "/nova/delete",
      PING_PROJECT: "/projects/ping",
      LIST_IMAGES: "/image/images",
      OVERVIEW: "/dashboard/overview",
    },
  },
} as const;

export const InfraService = {
  async listServers(): Promise<NovaServersResponse> {
    const result = await client.get<NovaServersResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.SERVERS,
    );
    if (result.error) {
      throw new Error(`Error fetching servers: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from servers endpoint");
    }
    return result.data;
  },

  async startServer(serverId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.START_SERVER +
        `/${serverId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error starting server: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from start server endpoint");
    }
    return result.data;
  },

  async stopServer(serverId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.STOP_SERVER +
        `/${serverId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error stopping server: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from stop server endpoint");
    }
    return result.data;
  },

  async rebootServer(serverId: string): Promise<NovaActionResponse> {
    const result = await client.post<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.REBOOT_SERVER +
        `/${serverId}`,
      { type: "json", data: {} },
    );
    if (result.error) {
      throw new Error(`Error rebooting server: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from reboot server endpoint");
    }
    return result.data;
  },

  async deleteServer(serverId: string): Promise<NovaActionResponse> {
    const result = await client.delete<NovaActionResponse>(
      API_CONFIG.INFRA.BASE_URL +
        API_CONFIG.INFRA.ENDPOINTS.DELETE_SERVER +
        `/${serverId}`,
    );
    if (result.error) {
      throw new Error(`Error deleting server: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from delete server endpoint");
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

  async listImages(): Promise<ImageListResponse> {
    const result = await client.get<ImageListResponse>(
      API_CONFIG.INFRA.BASE_URL + API_CONFIG.INFRA.ENDPOINTS.LIST_IMAGES,
    );
    if (result.error) {
      throw new Error(`Error fetching images: ${result.error.message}`);
    }
    if (!result.data) {
      throw new Error("No data received from images endpoint");
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
};
