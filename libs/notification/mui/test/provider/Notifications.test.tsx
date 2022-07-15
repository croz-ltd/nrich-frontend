/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import {
  act, render, renderHook, screen, waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { Notification, useNotifications } from "@nrich/notification-core";

import { Notifications } from "../../src";

describe("@nrich/notification-mui/provider/Notifications", () => {
  it("should render notification without messages ", async () => {
    // given
    const notificationDurationMs = 1000;
    const notification = {
      title: "Notification title",
      content: "Notification content",
      messageList: [],
      severity: "INFO",
    };
    const { result } = renderHook(() => useNotifications());
    const { add } = result.current;

    act(() => {
      add(notification as Notification);
    });

    // when
    render(
      <Notifications autoClose={notificationDurationMs} />,
    );

    // then
    expect(screen.getAllByRole("alert")[0]).toHaveTextContent("Notification title");
    expect(screen.getAllByRole("alert")[0]).toHaveTextContent("Notification content");
    expect(screen.getByRole("button")).toHaveAttribute("title", "Close");

    // and when
    userEvent.click(screen.getByRole("button"));

    // then
    expect(result.current.notifications).toHaveLength(0);
  });

  it("should render notification with messages ", async () => {
    // given
    const notification = {
      title: "Notification title",
      content: "Notification content",
      messageList: ["First message"],
      severity: "WARNING",
    };
    const { result } = renderHook(() => useNotifications());
    const { add } = result.current;

    act(() => {
      add(notification as Notification);
    });

    // when
    render(
      <Notifications autoClose={20} position="top-right" />,
    );

    // then
    expect(screen.getAllByRole("alert")[0]).toHaveTextContent("First message");

    await waitFor(() => expect(result.current.notifications).toHaveLength(0));
  });

  it("should render notification with overridden configuration ", async () => {
    // given
    const uxNotificationOptions = { autoClose: 5, position: "bottom-center" } as Record<string, unknown>;
    const notification = {
      title: "Notification title",
      content: "Notification content",
      messageList: [],
      severity: "WARNING",
      uxNotificationOptions,
    };

    const { result } = renderHook(() => useNotifications());
    const { add } = result.current;

    act(() => {
      add(notification as Notification);
    });

    // when
    render(
      <Notifications autoClose={20} position="top-left" />,
    );

    // then
    expect(screen.getAllByRole("presentation")[0]).toHaveClass("MuiSnackbar-root MuiSnackbar-anchorOriginBottomCenter");

    await waitFor(() => expect(result.current.notifications).toHaveLength(0));
  });

  it("should ignore invalid overridden configuration ", async () => {
    // given
    const uxNotificationOptions = { autoClose: "invalid", position: "invalid" } as Record<string, unknown>;
    const notification = {
      title: "Notification title",
      content: "Notification content",
      messageList: [],
      severity: "INFO",
      uxNotificationOptions,
    };

    const { result } = renderHook(() => useNotifications());
    const { add } = result.current;

    act(() => {
      add(notification as Notification);
    });

    // when
    render(
      <Notifications autoClose={20} position="top-left" />,
    );

    // then
    expect(screen.getAllByRole("presentation")[0]).toHaveClass("MuiSnackbar-root MuiSnackbar-anchorOriginTopLeft");

    await waitFor(() => expect(result.current.notifications).toHaveLength(0));
  });
});
