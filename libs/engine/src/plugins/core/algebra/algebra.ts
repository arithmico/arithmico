import createPluginV2 from "../../../utils/plugin-builder-v2";
import lsolveFragment from "./fragments/lsolve";
import crossFragment from "./fragments/cross";
import inverseMatrixFragment from "./fragments/inverse-matrix";
import polynomialFragment from "./fragments/polynomial";

const algebraPlugin = createPluginV2('core/algebra', 'core', 'Contains functions to solve linear equations, work with vectors and another algebraic functions.')
    .addFragment(lsolveFragment)
    .addFragment(crossFragment)
    .addFragment(inverseMatrixFragment)
    .addFragment(polynomialFragment)
    .build();

export default algebraPlugin;