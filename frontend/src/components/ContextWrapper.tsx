"use client"
import {FilterProductCategoryProvider} from '@/context/FilterProductContext';
import React from 'react'

const ContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <FilterProductCategoryProvider>{children}</FilterProductCategoryProvider>
}

export default ContextWrapper
