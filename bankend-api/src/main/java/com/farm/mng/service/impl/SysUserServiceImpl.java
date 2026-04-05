package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.SysUser;
import com.farm.mng.mapper.SysUserMapper;
import com.farm.mng.service.ISysUserService;
import org.springframework.stereotype.Service;

/**
 * 系统用户服务实现
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {
}