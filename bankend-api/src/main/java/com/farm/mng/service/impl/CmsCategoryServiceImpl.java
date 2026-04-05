package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.CmsCategory;
import com.farm.mng.mapper.CmsCategoryMapper;
import com.farm.mng.service.ICmsCategoryService;
import org.springframework.stereotype.Service;

/**
 * 内容分类服务实现
 */
@Service
public class CmsCategoryServiceImpl extends ServiceImpl<CmsCategoryMapper, CmsCategory> implements ICmsCategoryService {
}