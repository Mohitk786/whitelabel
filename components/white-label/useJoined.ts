"use client";

import { useEffect, useState } from "react";
import { JOINED_STORAGE_KEY } from "@/lib/constants";

const EVENT = "lunacal-wl:joined";

function readJoined(): boolean {
  try {
    return window.localStorage.getItem(JOINED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markJoined() {
  try {
    window.localStorage.setItem(JOINED_STORAGE_KEY, "1");
  } catch {
    // Private mode or blocked storage: the success state still shows this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useJoined() {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    setJoined(readJoined());
    const onJoined = () => setJoined(true);
    window.addEventListener(EVENT, onJoined);
    return () => window.removeEventListener(EVENT, onJoined);
  }, []);

  return joined;
}
