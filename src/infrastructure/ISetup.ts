/**
 * The interface of services that setup some aspect of the system.
 *
 * @export
 * @interface ISetup
 */
export default interface ISetup {
  /**
   * Method in charge of running the operations necessary for setting up
   * the concrete aspect of the system.
   *
   * @memberof ISetup
   */
  setup(): void;
}
