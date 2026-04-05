package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.SysDept;
import com.farm.mng.mapper.SysDeptMapper;
import com.farm.mng.service.ISysDeptService;
import org.springframework.stereotype.Service;

/**
 * 部门服务实现
 */
@Service
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, SysDept> implements ISysDeptService {
}