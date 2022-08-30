# Easy FT Logger

**Easy FT Logger** (FT means Formatted Text) is a very simple JavaScript
console logger for *node.js* that offers an intelligible syntax, merely
named **Easy FT**, as a substitute for the **ANSI escape code**.

| Type        | Syntax      | Example     |
| ----------- | ----------- | ----------- |
| **Easy FT** | ``%{<easyft-code>}`` | ``%{bold; red}`` |
| **ANSI Escape Code** | ``\x1b[<ansiesc-code>m`` | ``\x1b[1;31m`` |

The **Easy FT** syntax is an explicit style declaration, or set of 
declarations, that is easy to memorize and makes sense for any basic 
English-speaker, unlike the **ANSI Escape Code** which may certainly
be almost always shorter, but which is a bunch of integers, and semicolons,
that makes sense only for those who learnt it by heart.

**Easy FT** allows the extension of its features, either for a specific 
logger, or for all the loggers, which implies that it can be used
beyond the *AINSI escape code* substitution.

## Using Easy FT Logger

The *Easy FT Logger* module exports a class whith static and instance
attributes and methods. Therefore, to log some stuffs, an **EasyFTLogger**
object must be instanciated:

```js
const EasyFTLogger = require("easyft-logger");
const logger = new EasyFTLogger();
```

The instanciated logger will copy all default values
of ``EasyFTLogger``: ``specials``, ``styles`` and the *converters*.

Then the ``EasyFTLogger`` object can be used to log anything:

```js
logger.log("%{bold}Today%{} is a %{italic; orange}sunny%{} day!");
// OR
logger.log("%{bold}%s%{} %s %{italic; orange}%s%{} %s",
		   "Today", "is a", "sunny", "day!");
```

**Output**:

> **Today** is a <i style="color: #ff7f00;">sunny</i> day!

## Log

The log functions formats the message to replace *Easy FT*
statements and uses the corresponding methods of the 
JavaScript ``console``:
- **``log``**``(message[, ...args])``
- **``info``**``(message[, ...args])``
- **``warn``**``(message[, ...args])``
- **``error``**``(message[, ...args])``

It is also possible to pass an array with the message and
arguments to the functions prefixed with ``$``:
- **``$log``**``(messageAndArgs)``
- **``$info``**``(messageAndArgs)``
- **``$warn``**``(messageAndArgs)``
- **``$error``**``(messageAndArgs)`` 

## Special Characters

The ``EasyFTLogger`` class and instance contain a ``specials``
attribute which is an object. The names are the charater(s)
between brackets. They must be declared in
lower-case and cannot use the ``}`` character.
The values are the values that replace the corresponding statements
in a message.

By default, there is only one special character:

| Name | Special character | Example |
| --- | --- | --- |
| ``%{`` | ``%%{`` | ``"{%{}red}"`` -> ``"%%{red}"`` |

## Styles

The ``EasyFTLogger`` class and instance contain a ``styles``
attribute which is an object that gives a specific name to
a specific style of the *ANSI escape code*.

- The names in the object are the
names of the style (like ``red`` or ``bold``),
they must be declared in lower-case and cannot contain
the ``}`` character.
- The values is the *ANSI escape code* that replaces the 
given *Easy FT* statement.

There are two differences between a *style* and a *special character*:
- The style can only generate an *ANSI escape code*.
Indeed, *Easy FT* will surround the result with ``\x1b[`` and ``m``
(For example, in the ``styles``, ``red`` refers to ``38;2;255;0;0``
and logging ``%{red}`` sends ``\x1b[38;2;255;0;0m`` to the console)
- The syntax allows multiples styles separated with semicolons
and optional whitespaces in one statements (``%{bold; red}``).

### Styles: Reset

Writing nothing is the same as ``0``, ``r`` or ``reset`` and
resets the style: ``%{}``, ``%{0}``, ``%{r}`` and ``%{reset}``
return the same.

*Easy FT* does not reset anything automatically, so it is better always
to reset the style at the end of a message if it is required, otherwise,
further usages of the console may output the text with the last
defined style.

### Styles: ANSI escape code

The *Easy FT* style statement also allows to use ``ANSI escape codes``.
In general, every integers is returned as it is:
``%{bold; 38;2; 255; 200; 50}`` -> ``\x1b[1;38;2;255;200;50m``.
Using or not the *ANSI escape code* depends whether
or not the code required to be read by other developpers that may not
know the *ANSI escape code*.

### Styles: Text

The convention for text style is to use a name
and add a shortcut with only one letter. Here is the list of
the default styles:

| Name | Short name | Description |
| --- | --- | --- |
| ``reset`` | ``r`` | Resets the console output style. |
| ``bold`` | ``b`` | Displays the text bolded. |
| ``dark`` | ``d`` | Makes the text colors darkers. |
| ``italic`` | ``i`` | Displays the text in italic. |
| ``underline`` | ``u`` | Displays the text underlined. |

### Styles: Defined Colors

*Easy FT Logger* uses RGB values to define the default colors.
The result depends on the shell and it may diverge from the display
of the documentation.

#### Styles: Defined Colors - Background and Text:

Each color has a background version with the ``bg:`` prefix
and a text version using the ``c:`` prefix or no prefix at all.

| Prefix | Example | Description |
| --- | --- | --- |
|  | ``%{red}`` | Defines the text color. |
| ``c:`` | ``%{c:red}`` | Defines the text color. |
| ``bg:`` | ``%{bg:red}`` | Defines the background color. |

This prefix system is only a convention and *Easy FT* defines all
the style in the same way. However, the ``addColor`` static and
instance method will automatically generate the background and
text colors with the specific prefixes. See the *Defining Colors*
chapter for deeper information.

Of course, it is possible to define together a background and a text color. 
For example:
``%{yellow; bg:red}I have no idea what the yellow on red refers to.%{}``.

Output:
> <span style="color: #ff0; background-color: #f00;">I have no idea what the yellow on red refers to.</span>

#### Styles: Defined Colors - Light and Dark:

When a color exists, it often exists a ``light`` and ``dark`` version.
The default colors all provide a ``light`` and a ``dark`` version.
For example: it exists the ``red`` color, as well as the
``lightred`` and ``darkred`` ones.

#### Styles: Defined Colors - All Versions of a Color:

As a summary, here is the list of red colors:

| Name | Description |
| --- | --- |
| ``lightred`` | light red text color |
| ``red`` | red text color |
| ``darkred`` | dark red text color |
| ``c:lightred`` | light red text color |
| ``c:red`` | red text color |
| ``c:darkred`` | dark red text color |
| ``bg:lightred`` | light red backround color |
| ``bg:red`` | red backround color |
| ``bg:darkred`` | dark red backround color |

#### Styles: Defined Colors - All Default Colors:

Here is the list of all the default colors offered by *Easy FT Logger*
which contains two synonyms: *grey* = *gray* and *magenta* = *pink*.

- <span style="color: rgb(255, 255, 255); background: #111;">lightwhite = white</span>
- <span style="color: rgb(213, 213, 213); background: #111;">darkwhite</span>
- <span style="color: rgb(169, 169, 169); background: #111;">lightgrey = lightgray</span>
- <span style="color: rgb(127, 127, 127); background: #111;">grey = gray</span>
- <span style="color: rgb(85, 85, 85); background: #aaa">darkgrey = darkgray</span>
- <span style="color: rgb(42, 42, 42); background: #aaa">lightblack</span>
- <span style="color: rgb(0, 0, 0); background: #aaa">black = darkblack</span>
- <span style="color: rgb(255, 150, 150); background: #111;">lightred</span>
- <span style="color: rgb(255, 0, 0); background: #111;">red</span>
- <span style="color: rgb(127, 30, 30); background: #111;">darkred</span>
- <span style="color: rgb(255, 180, 120); background: #111;">lightorange</span>
- <span style="color: rgb(255, 127, 0); background: #111;">orange</span>
- <span style="color: rgb(127, 64, 15); background: #111;">darkorange</span>
- <span style="color: rgb(255, 255, 150); background: #111;">lightyellow</span>
- <span style="color: rgb(255, 255, 0); background: #111;">yellow</span>
- <span style="color: rgb(127, 127, 10); background: #111;">darkyellow</span>
- <span style="color: rgb(180, 255, 120); background: #111;">lightgreenyellow</span>
- <span style="color: rgb(127, 255, 0); background: #111;">greenyellow</span>
- <span style="color: rgb(64, 127, 15); background: #111;">darkgreenyellow</span>
- <span style="color: rgb(150, 255, 255); background: #111;">lightgreen</span>
- <span style="color: rgb(0, 255, 0); background: #111;">green</span>
- <span style="color: rgb(30, 127, 30); background: #111;">darkgreen</span>
- <span style="color: rgb(120, 255, 180); background: #111;">lightaquamarine</span>
- <span style="color: rgb(0, 255, 127); background: #111;">aquamarine</span>
- <span style="color: rgb(30, 127, 64); background: #111;">darkaquamarine</span>
- <span style="color: rgb(150, 255, 255); background: #111;">lightcyan</span>
- <span style="color: rgb(0, 255, 255); background: #111;">cyan</span>
- <span style="color: rgb(10, 127, 127); background: #111;">darkcyan</span>
- <span style="color: rgb(120, 180, 255); background: #111;">lightazure</span>
- <span style="color: rgb(0, 127, 255); background: #111;">azure</span>
- <span style="color: rgb(10, 64, 127); background: #111;">darkazure</span>
- <span style="color: rgb(150, 150, 255); background: #111;">lightblue</span>
- <span style="color: rgb(0, 0, 255); background: #111;">blue</span>
- <span style="color: rgb(30, 30, 127); background: #111;">darkblue</span>
- <span style="color: rgb(180, 120, 255); background: #111;">lightviolet</span>
- <span style="color: rgb(127, 0, 255); background: #111;">violet</span>
- <span style="color: rgb(64, 10, 127); background: #111;">darkviolet</span>
- <span style="color: rgb(255, 150, 255); background: #111;">lightmagenta = lightpink</span>
- <span style="color: rgb(255, 0, 255); background: #111;">magenta = pink</span>
- <span style="color: rgb(127, 10, 127); background: #111;">darkmagenta = darkpink</span>
- <span style="color: rgb(255, 120, 180); background: #111;">lightvioletred</span>
- <span style="color: rgb(255, 0, 127); background: #111;">violetred</span>
- <span style="color: rgb(127, 10, 64); background: #111;">darkvioletred</span>

### Styles: RGB Colors

*Easy FT* provides a syntax to write some rgb colors. This kind of
color has nothing to do with the ``styles`` attribute, it uses
a converter. See the corresponding chapter for further information.

The syntax of the declaration of an rgb color is: ``[bg:]rgb(r[,g[,b]])``

- ``r``, ``g`` and ``b`` are integers between 0 and 255.
- An empty parameter is set to ``0``: ``rgb(255)`` = ``rgb(255, 0, 0)`` and ``rgb(255,,50)`` = ``rgb(255, 0, 50)``.
- Spaces are allowed around arguments: ``rgb( 255, 200, 50 )``.
- Further parameters are ignored: ``rgb(255, 0, 0, 10)`` = ``rgb(255, 0, 0)``.
- The ``bg:`` prefix indicates that it is a background color: ``bg:rgb(50, 200, 150)``.

## Defining Colors

To know more about the syntax and usage of colors,
see the *Styles: Defined Colors* sub-chapter of the *Styles* chapter.

``EasyFTLogger`` provides a static and instance ``addColor`` method:
```js
addColor(name:string, 
		light: integer|integer[3],
		normal: integer|integer[3],
		dark: integer|integer[3]): EasyFTLogger
```
or
```js
addColor(name:string, 
		normal: integer|integer[3]): EasyFTLogger
```

The ``normal`` argument is not optional, but ``light`` and ``dark``
can be either ``null`` or ``undefined`` if this colors are not needed.

``normal``, ``light`` and ``dark`` can be either an index in the 256-color
palette, or an array with the red, green and blue values between 0 and 255.

This method will add every colors for the text (without prefix and also
with the ``c:`` prefix) abd the colors for the background
(with the ``bg:`` prefix).

If ``addColor`` is called on ``EasyFTLogger``, every logger will be able
to use the new color.

``EasyFTLogger`` also provides a static and instance
``printColors(bg: boolean = false): EasyFTLogger``
method. If ``bg`` is ``true``, the colors are printed in the background.

## Converters

If nothing was found in the special characters and in the styles,
``EasyFTLogger`` will search for a converter.

A converter is an ``EasyFTLogger.Converter`` object with three parmaters:
- **``name``**``: string``
- **``regExp``**``: RegExp``: used to identify the code as convertable.
It is recommended to begin with ``^`` and to end with ``$`` to match
the whole code because it avoids collisions between converters.
- **``convert``**``: Function(result[, ...groups]): string``:
converts the code.
The arguments are all resulting data of the execution of the
regular expression.

``EasyFTLogger`` provides a static and instance ``addConverter``
method:
```js
addConverter(	name:string, 
				regExp: RegExp,
				convert: Function): EasyFTLogger
```

Calling the ``addConverter`` method on the ``EasyFTLogger`` class
adds the converter to all existing and future ``EasyFTLogger`` object.

### Converters: Default Converters

| Name | Description | Example |
| --- | --- | --- |
| ``code`` | Allows the usage of integers in styles which will be returned as it is. In other code, it is possible to use the ANSI escape code. | ``%{0;35}`` |
| ``rgb`` | See the *Styles: RGB* sub chapter of the *Style* chapter. | ``%{rgb(255, 0, 0); bg:rgb(255, 255, 0)}`` |

## Parsing

An ``EasyFTLogger`` object parses the given string to find the ``%{<code>}``
statements. ``<code>`` cannot contain the ``}`` character.
``<code>`` can be either a **special character**,
a **style** or a special type retrieved from a **converter**.
The parsing will search in order:
- Special characters in the ``specials`` attribute
- Styles in the ``styles`` attribute
- Special types recognized by one of the converter

To preformat a message, use the ``preformat(message[, ...args])``
method with the parameters used by the console log methods.
It replaces all the EasyFTLogger statements as explained above.
An EasyFTLogger statement which is not recognized is replaced with
an empty string. This method returns an object with the following
properties:
- **``message``**``: string``: the formated message. Every EasyFTLogger statements
where properly replaced and the other javascript statements
(like ``%s`` or ``%O``)`are remaining.
- **``arguments``**``: Array``: the list of data that relace the js statements
such like ``%s`` or ``%O``. No EasyFTLogger statement will be replaced
in the arguments.
- **``messageAndArguments``**``: Array``: the message is at the first index,
and the arguments are at the next indices. This can be used
with ``console.log.apply(console, result.messageAndArguments);``

The ``$preformat(arguments)`` method can be called with all arguments
of ``preformat(message[, ...args])``. It returns the same.

## Orphan Logger

Adding a color or a converter directly to the ``EasyFTLogger`` class
also adds it to the existing instances. To prevent this behavior
for a logger, it is possoble to create an orphan logger
with the ``EasyFTLogger.orphanLogger`` static method.

## Syntax Summary

| Effect | Syntax | Example |
| --- | --- | --- |
| *Easy FT* statement | ``%{<code>}`` |
| Special characters statement | ``%{<char>}`` | ``%{%{}`` |
| Writing ``%%{`` | ``%{%{}`` |
| Style statement | ``%{<style>[;<style>]*}`` | ``%{bold; italic; red}`` |
| Reseting the style | ``%{}`` or ``%{0}`` or ``%{r}`` or ``%{reset}``
| ANSI Escape Code | ``%{<number>}`` | ``%{38;5;25}``
| Bold | ``%{b}`` or ``%{bold}``
| Dark | ``%{d}`` or ``%{dark}``
| Italic | ``%{i}`` or ``%{italic}``
| Underline | ``%{u}`` or ``%{underline}``
| Defined Text Color | ``%{<color-name>}`` | ``%{red}`` or ``%{lightred}``
| Defined Background Color | ``%{bg:<color-name>}`` | ``%{bg:red}`` or ``%{bg:lightred}``
| RGB Color | ``%{rgb(<r>,[<g>,[<b>]]}`` | ``%{rgb(10, 80, 100)}``