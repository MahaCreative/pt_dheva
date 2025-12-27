import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BarChartIcon from '@mui/icons-material/BarChart';
import BoltIcon from '@mui/icons-material/Bolt';
import CakeIcon from '@mui/icons-material/Cake';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DiamondIcon from '@mui/icons-material/Diamond';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MovieIcon from '@mui/icons-material/Movie';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const ICONS = {
    chart: BarChartIcon,
    movie: MovieIcon,
    money: PaidIcon,
    bolt: BoltIcon,
    phone: PhoneIcon,
    trending: TrendingUpIcon,
    security: SecurityIcon,
    star: StarIcon,
    trophy: EmojiEventsIcon,
    check: CheckCircleIcon,
    people: PeopleIcon,
    settings: SettingsIcon,
    rocket: RocketLaunchIcon,
    diamond: DiamondIcon,
    search: SearchIcon,
    edit: EditIcon,
    save: SaveIcon,
    flag: FlagIcon,
    package: Inventory2Icon,
    info: InfoIcon,
    cake: CakeIcon,
    bank: AccountBalanceIcon,
    refresh: AutorenewIcon,
    help: HelpOutlineIcon,
};

export default function MuiIcon({ name = 'chart', className = '', fontSize = 'medium' }) {
    const Icon = ICONS[name] || BarChartIcon;
    return <Icon className={className} fontSize={fontSize} />;
}
