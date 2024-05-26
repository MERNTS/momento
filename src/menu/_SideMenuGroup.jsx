// _SideMenuGroup.jsx

import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '@mui/material/SvgIcon';
import StyledBadge from './_SideMenuStyledBadge';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';

import { useSideMenuState, useSideMenuStateUpdate, useSideMenuBadge } from './_SMenuHooks';
import SMenuSubItem from './_SideMenuSubItem';

function IconItem ({ open, icon, title }) {
    return (
        <ListItemIcon
            sx={{
                '& svg': {
                    transition: '0.2s',
                    transform: open ? 'scale(1)' : 'scale(1.2)',
                },

                '&:hover, &:focus': {
                    '& svg:first-of-type': {
                        transform: open ? 'scale(1)' : 'scale(1.3)',
                    }
                },
            }}>
            {
                icon == null ?
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                            fontSize: 18,
                            bgcolor: grey[600],
                            transition: '0.2s',
                            transform: open ? 'scale(1)' : 'scale(1.2)'
                        }}
                        variant="rounded"
                    >
                        {title.substring(0, 1).toUpperCase()}
                    </Avatar> :
                    <SvgIcon component={icon} />
            }
        </ListItemIcon>
    )
}

/**
 * 含有子菜单的菜单项
 * @param props
 * @returns
 */
function SideMenuGroup({
                           id, //菜单项的ID名称
                           icon = null, //图标
                           title, //标题
                           childrenData, //子菜单
                           onClick, //单击事件
                       }) {
    const { hoverItemId, open } = useSideMenuState();
    const updateMenuState = useSideMenuStateUpdate();
    const badgeCount = useSideMenuBadge();
    const groupBadgeNumber = childrenData.map((item) => badgeCount[item.id]).reduce((a, b) => a + b, 0);
    const handleClick = () => {
        updateMenuState({hoverItemId: hoverItemId === id ? null : id})
    };

    return (
        <Box>
            <ListItemButton onClick={handleClick}>
                <Tooltip title={open ? null : title} arrow placement="right">
                    <Badge
                        badgeContent={open ? 0 : hoverItemId === id ? 0 : groupBadgeNumber}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        // variant="dot"
                        color="error">
                        <IconItem open={open} icon={icon} title={title} />
                    </Badge>
                </Tooltip>

                <Stack direction={"row"} justifyContent={"space-between"} sx={{ width: 300 }}>
                    <StyledBadge badgeContent={ hoverItemId === id ? null : groupBadgeNumber } color="error">
                        <ListItemText primary={title} />
                    </StyledBadge>

                    {hoverItemId === id ? <ExpandLess /> : <ExpandMore />}
                </Stack>

            </ListItemButton>
            <Collapse in={ hoverItemId === id } timeout="auto" unmountOnExit>
                <List component="div" dense={true} disablePadding>
                    {
                        childrenData === undefined ? null :
                            childrenData.map(function (itemData, index) {
                                return <SMenuSubItem
                                    icon = { itemData.icon }
                                    title = { itemData.title }
                                    id = {itemData.id}
                                    groupId = {id}
                                    groupTitle={title}
                                    onClick={onClick}
                                    key={index} />
                            })
                    }
                </List>
            </Collapse>
        </Box>
    );
}

export default SideMenuGroup;
