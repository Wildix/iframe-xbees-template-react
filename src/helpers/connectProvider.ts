let instance: any = null;

const connectProvider = () => {
  if (!instance) {
    //@ts-ignore
    instance = window.xBeesConnect ? new window.xBeesConnect() : null;

    if (!instance) {
      throw Error("xBeesConnect lib is not connected yet");
    }
  }
  return instance;
}

export default connectProvider;
