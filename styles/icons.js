import {
  MdMenu,
  MdOutlineHome,
  MdOutlineDashboardCustomize,
  MdOutlineLogout,
  MdOutlineExpandMore,
  MdOutlineMoreVert,
  MdOutlineCompareArrows,
  MdOutlineAdsClick,
  MdOutlineSort,
  MdOutlineImage,
  MdCheck,
  MdOutlineSettings,
} from "react-icons/md";
import { FaMoneyCheck, FaRegThumbsUp } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";

export const MenuIcon = (props) => <Icon {...props} as={MdMenu} />;
export const HomeIcon = (props) => <Icon {...props} as={MdOutlineHome} />;
export const DashboardIcon = (props) => (
  <Icon {...props} as={MdOutlineDashboardCustomize} />
);
export const LogoutIcon = (props) => <Icon {...props} as={MdOutlineLogout} />;
export const SelectDownIcon = (props) => (
  <Icon {...props} as={MdOutlineExpandMore} />
);
export const MoneyIcon = (props) => <Icon {...props} as={FaMoneyCheck} />;
export const MoreInfoIcon = (props) => (
  <Icon {...props} as={MdOutlineMoreVert} />
);
export const UsersReachedIcon = (props) => (
  <Icon {...props} as={MdOutlineCompareArrows} />
);
export const UsersClickedIcon = (props) => (
  <Icon {...props} as={MdOutlineAdsClick} />
);
export const ImpressionsIcon = (props) => (
  <Icon {...props} as={FaRegThumbsUp} />
);
export const SortIcon = (props) => <Icon {...props} as={MdOutlineSort} />;
export const ImageIcon = (props) => <Icon {...props} as={MdOutlineImage} />;
export const CheckIcon = (props) => <Icon {...props} as={MdCheck} />;
export const SettingsIcon = (props) => (
  <Icon {...props} as={MdOutlineSettings} />
);
