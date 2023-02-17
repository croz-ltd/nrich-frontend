/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import React, { DependencyList, EffectCallback } from "react";

/**
 * Helper hook, similar to useEffect, but doesn't trigger on initial load.
 * @param effect effect to be triggered
 * @param dependencies dependency array of the effect
 */
export const useUpdateEffect = (effect: EffectCallback, dependencies?: DependencyList) => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    firstRender.current = true;
  }, []);

  React.useEffect(() => {
    if (!firstRender.current) {
      return effect();
    }
    firstRender.current = false;
    return undefined;
  }, dependencies);
};

/**
 * Helper hook, similar to useEffect, but has additional debounce effect. Doesn't trigger on initial load.
 * Calls effect only once for multiple triggers, when debounce timer expires. Usefully in search/filters, to filter out unnecessary requests.
 * @param effect effect to be triggered
 * @param debounceTime time in milliseconds for debounce
 * @param dependencies dependecy array of the effect
 */
export const useDebouncedUpdateEffect = (effect: EffectCallback, debounceTime: number, dependencies?: DependencyList) => {
  const firstRender = React.useRef(true);
  const timeoutRef = React.useRef(null);
  const clearTimeout = () => window.clearTimeout(timeoutRef.current);

  React.useEffect(() => {
    firstRender.current = true;
    clearTimeout();
  }, []);

  React.useEffect(() => {
    clearTimeout();
    if (!firstRender.current) {
      timeoutRef.current = setTimeout(() => {
        effect();
      }, debounceTime);
    }
    firstRender.current = false;
  }, dependencies);
};
