package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.SysRole;
import com.farm.mng.mapper.SysRoleMapper;
import com.farm.mng.service.ISysRoleService;
import org.springframework.stereotype.Service;

/**
 * 系统角色服务实现
 */
@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements ISysRoleService {
}