/*:
 * @plugin ShuffleArrayPlugin
 * @target MZ
 * @author Your Name
 * @desc A plugin that provides a shuffle function accessible via plugin command and script call.
 *
 * @command shuffleArray
 * @text Shuffle Array
 * @desc Shuffles the elements of a given array.
 *
 * @arg arrayVariable
 * @type variable
 * @text Array Variable
 * @desc Select the variable that contains the array to be shuffled.
 *
 * @help
 * This plugin provides a shuffle function that can be used to randomize
 * the order of elements in an array.
 * 
 * Plugin Command:
 *   Use the "Shuffle Array" command and select the variable containing the array.
 * 
 * Script Call:
 *   ShuffleArrayPlugin.shuffle(array);
 * 
 * Examples of using the script call:
 * 
 * 1. With a local variable:
 *    let arr = [2, 11, 37, 42];
 *    arr = ShuffleArrayPlugin.shuffle(arr);
 * 
 * 2. With a game variable:
 *    let variableId = 1; // The ID of the variable containing your array
 *    let arr = $gameVariables.value(variableId);
 *    if (Array.isArray(arr)) {
 *        arr = ShuffleArrayPlugin.shuffle(arr);
 *        $gameVariables.setValue(variableId, arr);
 *    }
 * 
 * 3. Creating a new shuffled array:
 *    let originalArr = [2, 11, 37, 42];
 *    let shuffledArr = ShuffleArrayPlugin.shuffle([...originalArr]);
 * 
 * 4. In an event command script box:
 *    // Assuming the array is stored in variable 1
 *    var arr = $gameVariables.value(1);
 *    if (Array.isArray(arr)) {
 *        arr = ShuffleArrayPlugin.shuffle(arr);
 *        $gameVariables.setValue(1, arr);
 *    }
 * 
 * Remember, when using script calls, you need to handle the assignment 
 * of the shuffled array yourself. The plugin command does this automatically.
 */

var Imported = Imported || {};
Imported.ShuffleArrayPlugin = true;

var ShuffleArrayPlugin = ShuffleArrayPlugin || {};

(function() {
    ShuffleArrayPlugin.shuffle = function(array) {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        
        return array;
    };

    PluginManager.registerCommand("ShuffleArrayPlugin", "shuffleArray", args => {
        const variableId = Number(args.arrayVariable);
        const array = $gameVariables.value(variableId);
        
        if (Array.isArray(array)) {
            const shuffledArray = ShuffleArrayPlugin.shuffle([...array]);
            $gameVariables.setValue(variableId, shuffledArray);
        } else {
            console.warn("ShuffleArrayPlugin: The specified variable does not contain an array.");
        }
    });
})();