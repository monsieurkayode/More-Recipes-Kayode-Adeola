/**
 * import all module dependencies
 * @export all controllers 
 */
import { user } from './user';
import { vote } from './vote';
import { login } from './login';
import { recipe } from './recipe';
import { review } from './review';
import { favorite } from './favorite';

/**
 *@export all controllers 
 */
export default { user, login, recipe, review, favorite, vote };
