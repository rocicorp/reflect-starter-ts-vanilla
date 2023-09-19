import { Reflect } from "@rocicorp/reflect/client";
import { M } from "../reflect/mutators";

export function setupCounter(element: HTMLButtonElement, r: Reflect<M>) {
  r.subscribe(
    async (tx) => {
      const count = await tx.get<number>("count");
      return count ?? 0;
    },
    {
      onData: (count) => {
        element.innerHTML = `count is ${count}`;
      },
    }
  );

  element.addEventListener("click", () =>
    r.mutate.increment({ key: "count", delta: 1 })
  );
}
