import PropTypes from "prop-types";
import hostPolicyInterface, { IHostPolicy } from "./policy";
import hostUserInterface, { IHostUser } from "./host_users";
import labelInterface, { ILabel } from "./label";
import packInterface, { IPack } from "./pack";
import softwareInterface, { ISoftware } from "./software";
import hostQueryResult from "./campaign";
import queryStatsInterface, { IQueryStats } from "./query_stats";
import { ILicense, IDeviceGlobalConfig } from "./config";
import {
  IHostMacMdmProfile,
  MdmEnrollmentStatus,
  BootstrapPackageStatus,
} from "./mdm";

export default PropTypes.shape({
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  id: PropTypes.number,
  detail_updated_at: PropTypes.string,
  label_updated_at: PropTypes.string,
  policy_updated_at: PropTypes.string,
  last_enrolled_at: PropTypes.string,
  seen_time: PropTypes.string,
  refetch_requested: PropTypes.bool,
  hostname: PropTypes.string,
  uuid: PropTypes.string,
  platform: PropTypes.string,
  osquery_version: PropTypes.string,
  os_version: PropTypes.string,
  build: PropTypes.string,
  platform_like: PropTypes.string,
  code_name: PropTypes.string,
  uptime: PropTypes.number,
  memory: PropTypes.number,
  cpu_type: PropTypes.string,
  cpu_subtype: PropTypes.string,
  cpu_brand: PropTypes.string,
  cpu_physical_cores: PropTypes.number,
  cpu_logical_cores: PropTypes.number,
  hardware_vendor: PropTypes.string,
  hardware_model: PropTypes.string,
  hardware_version: PropTypes.string,
  hardware_serial: PropTypes.string,
  computer_name: PropTypes.string,
  primary_ip: PropTypes.string,
  primary_mac: PropTypes.string,
  distributed_interval: PropTypes.number,
  config_tls_refresh: PropTypes.number,
  logger_tls_period: PropTypes.number,
  team_id: PropTypes.number,
  pack_stats: PropTypes.arrayOf(
    PropTypes.shape({
      pack_id: PropTypes.number,
      pack_name: PropTypes.string,
      query_stats: PropTypes.arrayOf(queryStatsInterface),
    })
  ),
  team_name: PropTypes.string,
  additional: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  percent_disk_space_available: PropTypes.number,
  gigs_disk_space_available: PropTypes.number,
  labels: PropTypes.arrayOf(labelInterface),
  packs: PropTypes.arrayOf(packInterface),
  software: PropTypes.arrayOf(softwareInterface),
  status: PropTypes.string,
  display_name: PropTypes.string,
  users: PropTypes.arrayOf(hostUserInterface),
  policies: PropTypes.arrayOf(hostPolicyInterface),
  query_results: PropTypes.arrayOf(hostQueryResult),
  batteries: PropTypes.arrayOf(
    PropTypes.shape({
      cycle_count: PropTypes.number,
      health: PropTypes.string,
    })
  ),
});

export type HostStatus = "online" | "offline" | "new" | "missing";
export interface IDeviceUser {
  email: string;
  source: string;
}

export interface IDeviceMappingResponse {
  device_mapping: IDeviceUser[];
}

export interface IMunkiData {
  version: string;
}

type MacDiskEncryptionState =
  | "applied"
  | "action_required"
  | "enforcing"
  | "failed"
  | "removing_enforcement"
  | null;

type MacDiskEncryptionActionRequired = "log_out" | "rotate_key" | null;

interface IMdmMacOsSettings {
  disk_encryption: MacDiskEncryptionState | null;
  action_required: MacDiskEncryptionActionRequired | null;
}

interface IMdmMacOsSetup {
  bootstrap_package_status: BootstrapPackageStatus | "";
  details: string;
  bootstrap_package_name: string;
}

export interface IHostMdmData {
  encryption_key_available: boolean;
  enrollment_status: MdmEnrollmentStatus | null;
  name?: string;
  server_url: string | null;
  id?: number;
  profiles: IHostMacMdmProfile[] | null;
  macos_settings?: IMdmMacOsSettings;
  macos_setup?: IMdmMacOsSetup;
}

export interface IMunkiIssue {
  id: number;
  name: string;
  type: "error" | "warning";
  created_at: string;
}

interface IMacadminMDMData {
  enrollment_status: MdmEnrollmentStatus | null;
  name?: string;
  server_url: string | null;
  id?: number;
}

export interface IMacadminsResponse {
  macadmins: null | {
    munki: null | IMunkiData;
    mobile_device_management: null | IMacadminMDMData;
    munki_issues: IMunkiIssue[];
  };
}

export interface IPackStats {
  pack_id: number;
  pack_name: string;
  query_stats: IQueryStats[];
  type: string;
}

export interface IHostPolicyQuery {
  id: number;
  display_name: string;
  query_results?: unknown[];
  status?: string;
}

interface IGeoLocation {
  country_iso: string;
  city_name: string;
  geometry?: {
    type: string;
    coordinates: number[];
  };
}

interface IBattery {
  cycle_count: number;
  health: string;
}

export interface IHostResponse {
  host: IHost;
}

export interface IDeviceUserResponse {
  host: IHost;
  license: ILicense;
  org_logo_url: string;
  disk_encryption_enabled?: boolean;
  platform?: string;
  global_config: IDeviceGlobalConfig;
}

export interface IHostEncrpytionKeyResponse {
  host_id: number;
  encryption_key: {
    updated_at: string;
    key: string;
  };
}

export interface IHost {
  created_at: string;
  updated_at: string;
  id: number;
  detail_updated_at: string;
  label_updated_at: string;
  policy_updated_at: string;
  last_enrolled_at: string;
  seen_time: string;
  refetch_requested: boolean;
  hostname: string;
  uuid: string;
  platform: string;
  osquery_version: string;
  os_version: string;
  build: string;
  platform_like: string;
  code_name: string;
  uptime: number;
  memory: number;
  cpu_type: string;
  cpu_subtype: string;
  cpu_brand: string;
  cpu_physical_cores: number;
  cpu_logical_cores: number;
  hardware_vendor: string;
  hardware_model: string;
  hardware_version: string;
  hardware_serial: string;
  computer_name: string;
  public_ip: string;
  primary_ip: string;
  primary_mac: string;
  distributed_interval: number;
  config_tls_refresh: number;
  logger_tls_period: number;
  team_id: number | null;
  pack_stats: IPackStats[] | null;
  team_name: string | null;
  additional?: object; // eslint-disable-line @typescript-eslint/ban-types
  percent_disk_space_available: number;
  gigs_disk_space_available: number;
  labels: ILabel[];
  packs: IPack[];
  software: ISoftware[];
  issues: {
    total_issues_count: number;
    failing_policies_count: number;
  };
  status: HostStatus;
  display_text: string;
  display_name: string;
  target_type?: string;
  users: IHostUser[];
  device_users?: IDeviceUser[];
  munki?: IMunkiData;
  mdm: IHostMdmData;
  policies: IHostPolicy[];
  query_results?: unknown[];
  geolocation?: IGeoLocation;
  batteries?: IBattery[];
  disk_encryption_enabled?: boolean;
}
