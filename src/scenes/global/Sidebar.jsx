import { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme,MenuItem as MUIItem } from '@mui/material'
import { Link } from "react-router-dom"
import "react-pro-sidebar/dist/css/styles.css"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ParkIcon from '@mui/icons-material/Park';
import LandslideIcon from '@mui/icons-material/Landslide';
import LanguageIcon from '@mui/icons-material/Language';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StoreIcon from '@mui/icons-material/Store';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/More';
import ForestIcon from '@mui/icons-material/Forest';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import AddIcon from '@mui/icons-material/Add';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GrassIcon from '@mui/icons-material/Grass';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LogoutIcon from '@mui/icons-material/Logout';
import PendingIcon from '@mui/icons-material/Pending';
import LockResetIcon from '@mui/icons-material/LockReset';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import IosShareIcon from '@mui/icons-material/IosShare';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SchoolIcon from '@mui/icons-material/School';
import { useDispatch } from 'react-redux';
import { showSidebar } from '../../actions/app.action'
import { useSelector } from 'react-redux'
import { ROLES } from '../../constants'

import * as loginActions from '../../actions/login.action'
import { useNavigate } from "react-router-dom"

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>

    )
}

const CollapsedIcon = () => {
    return (
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml="28px"
        >
            <RadioButtonUncheckedIcon />
        </Box>        
    )
}

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    const [roles, setRoles] = useState([])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // dispatch(showSidebar(!isCollapsed))   
    
    const { result } = useSelector((state) => state.app.loginReducer)

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    console.log('isSidebar in Sidebar',isSidebar)  
    // console.log('isCollapsed',isCollapsed)  

    useEffect(() => {
        setRoles(result?.roles)
    },[result?.roles])
    
    const handleLogout = () => {
        dispatch(loginActions.logout({navigate},roles))
    }    


    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[600]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    // color: `${colors.blueAccent[600]} !important`
                },
                "& .pro-inner-item:hover": {
                    color: "#71884c !important"
                },
                "& .pro-menu-item": {
                    color: `${colors.grey[700]} !important`
                },                
                "& .pro-menu-item.active": {
                    color: "#71910c !important"
                },
                "& .pro-sub-menu": {
                    color: `${colors.greenAccent[600]} !important`
                },
                // "& .pro-sub-menu": {
                //     color: `${colors.primary[700]} !important`
                // }
                // "& .pro-inner-list-item": {
                //     marginLeft: "15px"
                // },               
                // "& .pro-inner-list-item": {
                //     color: `${colors.greenAccent[600]} !important`
                // },               
                // "& .pro-sidebar": {
                //     position: 'fixed',
                // }              
            }}
        >
            <ProSidebar collapsed={!isSidebar} width='327px' >
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => {dispatch(showSidebar(!isSidebar)) }}
                        icon={!isSidebar ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.blueAccent[700]
                        }}
                    >
                        {isSidebar && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant='h3' color={colors.grey[100]}>
                                    {/* ADMINIS */}
                                </Typography>
                                <IconButton onClick={() => dispatch(showSidebar(!isSidebar))}>
                                    <MenuOutlinedIcon 
                                        style={{
                                            color: colors.grey[800]
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {isSidebar && (
                        <Box mb="25px">
                            <Box textAlign={"center"}>
                                <Typography
                                    // variant='h4' color={colors.blueAccent[600]}
                                    variant='h4' color={colors.greenAccent[500]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Science Data Center: SDC
                                </Typography>
                                <Typography
                                    variant='h7' color={colors.greenAccent[300]}
                                >ระบบฐานข้อมูลศูนย์กลางคณะวิทยาศาสตร์</Typography>
                            </Box>
                        </Box>
                    )}


                    {/* MENU ITEMS */}
                    <Box paddingLeft={!isSidebar ? undefined : '2%'} >

                        {/* { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="แดชบอร์ด"
                                to="/dashboard"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined
                         }
  */}
 
                         { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="แดชบอร์ด" icon={<HomeOutlinedIcon />}>
                            <Item
                                title="หน้ารวม"
                                to="/dashboard"
                                icon={<DehazeIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />                            
                            <Item
                                title="ด้านบุคลากร"
                                to="/dashboard/dashboard1"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="ด้านกิจการนิสิต"
                                to="/dashboard/dashboard2"
                                icon={<SchoolIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                            <Item
                                title="ด้านหลักสูตร"
                                to="/dashboard/dashboard3"
                                icon={<FmdBadIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="ด้านวิจัย"
                                to="/dashboard/dashboard4"
                                icon={<WbIncandescentIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                            <Item
                                title="ด้านแผนและงบประมาณ"
                                to="/dashboard/dashboard5"
                                icon={<PlaylistAddCheckIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                                                        
                         </SubMenu>   : undefined  }  

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="1.ด้านบุคลากร" icon={<PeopleOutlinedIcon />}>
                            <Item
                                title="ข้อมูลคลากร"
                                to="/staff"
                                icon={<SchoolIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="ข้อมูลการศึกษาบุคลากร"
                                to="/staffeducation"
                                icon={<StickyNote2Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                            <Item
                                title="ข้อมูลการลาบุคลากร"
                                to="/leaverecord"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />                            
                                                        
                         </SubMenu>   : undefined  }                          

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="2.ด้านกิจการนิสิต" icon={<SchoolIcon />}>
                            <Item
                                title="ข้อมูลนิสิต"
                                to="/student"
                                icon={<PersonIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="ทุนการศึกษา"
                                to="/studentgrant"
                                icon={<StickyNote2Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                                                        
                         </SubMenu>   : undefined  } 


                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="3.ด้านหลักสูตร" icon={<FmdBadIcon />}>
                            <Item
                                title="ข้อมูลหลักสูตร"
                                to="/academicprogram"
                                icon={<DehazeIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="แผนการรับนิสิต"
                                to="/admissionplan"
                                icon={<StickyNote2Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                                                        
                         </SubMenu>   : undefined  }                                               


                        <SubMenu title="4.ด้านการวิจัย" icon={<WbIncandescentIcon />}>
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ผลงานวิจัยตีพิมพ์"
                                to="/publication"
                                icon={<MenuBookIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }  

                        {/* { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ผลงานวิจัยตีพิมพ์ระดับชาติ"
                                to="/student"
                                icon={<HandshakeIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }                              
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="นวัตกรรม/อนุสิทธิบัตร"
                                to="/student"
                                icon={<Diversity3Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }      */}
                            
                         </SubMenu>                                               


                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="5.ด้านแผนและงบประมาณ" icon={<PlaylistAddCheckIcon />}>
                            <Item
                                title="ข้อมูลโครงการ"
                                to="/project"
                                icon={<StickyNote2Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="การติดตามเอกสาร"
                                to="/document"
                                icon={<StickyNote2Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> 
                         </SubMenu>   : undefined  }         

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="6.หน้านำเข้าข้อมูล" icon={<IosShareIcon />}>
                            <Item
                                title="รายการแฟ้มเอกสาร"
                                to="/importdata"
                                icon={<FolderOpenIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                         </SubMenu>   : undefined  }                                                  

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <SubMenu title="7.สำหรับผู้ดูแลระบบ" icon={<PeopleOutlinedIcon />}>
                            <Item
                                title="ข้อมูลผู้ใช้"
                                to="/users/list"
                                icon={<PersonIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="ประวัติการใช้ API"
                                to="/system/log"
                                icon={<PendingIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                         </SubMenu>   : undefined  }   

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <MenuItem
                            style={{ color: colors.grey[100] }}
                            onClick={() => handleLogout()}
                            icon={<LogoutIcon/>}
                            >
                            <Typography>ออกจากระบบ</Typography>
                            </MenuItem> : undefined
                         }                         
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar