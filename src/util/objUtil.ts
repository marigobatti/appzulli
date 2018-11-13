export class ObjUtil {

    public static mapToObj(map: Map<any, any>) {
        const out = Object.create(null);
        map.forEach((value, key) => {
            if (value instanceof Map) {
            out[key] = this.mapToObj(value);
        } else {
            out[key] = value;
          }
        });

        return out;
      }
}