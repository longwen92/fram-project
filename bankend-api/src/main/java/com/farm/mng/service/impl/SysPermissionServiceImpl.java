package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.SysPermission;
import com.farm.mng.mapper.SysPermissionMapper;
import com.farm.mng.service.ISysPermissionService;
import org.springframework.stereotype.Service;

/**
 * 系统权限服务实现
 */
@Service
public class SysPermissionServiceImpl extends ServiceImpl<SysPermissionMapper, SysPermission> implements ISysPermissionService {
}