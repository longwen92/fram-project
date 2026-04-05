package com.farm.mng.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.farm.mng.entity.Purchase;
import org.apache.ibatis.annotations.Mapper;

/**
 * 采购Mapper
 */
@Mapper
public interface PurchaseMapper extends BaseMapper<Purchase> {
}