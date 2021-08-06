
// TODO: automate testing
const Debug = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const method = descriptor.value;
    let isPromise = false;

    descriptor.value = (...args: unknown[]) => {
      try {
        Logger.debug(``);
        Logger.debug(`=======================================`);
        Logger.debug(`*** Method "${propertyKey}()" Input ***`);

        for (let i = 0; i < args.length; ++i) {
          Logger.debug(``);
          Logger.debug(`---------------------------------------`);
          Logger.debug(`Argument number ${i}:`);
          Logger.debug(JSON.stringify(args[i], null, 2));
        }

        Logger.debug(``);
        Logger.debug(`---------------------------------------`);
        Logger.debug(``);
        Logger.debug(`Executing...`);
        Logger.debug(``);

        const result = method.apply(this, args);

        if (result instanceof Promise) {
          isPromise = true;

          return result
            .then((data) => {
              Logger.debug(``);
              Logger.debug(``);
              Logger.debug(`---------------------------------------`);
              Logger.debug(`*** Method "${propertyKey}()" Output ***`);
              Logger.debug(JSON.stringify(data, null, 2));
              Logger.debug();
              Logger.debug(`=======================================`);

              return data;
            })
            .catch((error) => {
              Logger.debug(``);
              Logger.debug(``);
              Logger.debug(`---------------------------------------`);
              Logger.debug(`*** Method "${propertyKey}()" Error ***`);
              Logger.error(error);
              Logger.debug(`=======================================`);

              throw error;
            });
        }

        Logger.debug(``);
        Logger.debug(``);
        Logger.debug(`---------------------------------------`);
        Logger.debug(`*** Method "${propertyKey}()" Output ***`);
        Logger.debug(JSON.stringify(result, null, 2));
        Logger.debug(`=======================================`);

        return result;
      } catch (error) {
        if (!isPromise) {
          Logger.debug(``);
          Logger.debug(``);
          Logger.debug(`---------------------------------------`);
          Logger.debug(`*** Method "${propertyKey}()" Error ***`);
          Logger.error(error);
          Logger.debug(`=======================================`);
        }
      }
    };
  };
};

export default Debug;
