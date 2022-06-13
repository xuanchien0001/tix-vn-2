import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.PageLoadingReudcer);
  return isLoading ? (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-10 flex justify-center items-center">
      <Spin size="large" />
    </div>
  ) : (
    ""
  );
}
