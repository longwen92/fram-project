package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.SysMenu;
import com.farm.mng.mapper.SysMenuMapper;
import com.farm.mng.service.ISysMenuService;
import org.springframework.stereotype.Service;

/**
 * 系统菜单服务实现
 */
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements ISysMenuService {
}