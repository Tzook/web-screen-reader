System.register("patterns/chain-of-responsibility/ProcessingLinkInterface", [], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("analyze/AbstractAnalyzer", [], function (exports_2, context_2) {
    var __moduleName = context_2 && context_2.id;
    var AbstractAnalyzer;
    return {
        setters: [],
        execute: function () {
            AbstractAnalyzer = class AbstractAnalyzer {
                handle(node) {
                    let result;
                    let role = node.getAttribute("role");
                    if (role === this.getRole() || (!role || !this.getRole()) && this.analyze(node)) {
                        result = this;
                    }
                    else if (this.successor) {
                        result = this.successor.handle(node);
                    }
                    return result;
                }
                setSuccessor(successor) {
                    this.successor = successor;
                }
            };
            exports_2("AbstractAnalyzer", AbstractAnalyzer);
            ;
        }
    };
});
System.register("speak/SpeakerInterface", [], function (exports_3, context_3) {
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("analyze/LinkAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_4, context_4) {
    var __moduleName = context_4 && context_4.id;
    var AbstractAnalyzer_1, LinkAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_1_1) {
                AbstractAnalyzer_1 = AbstractAnalyzer_1_1;
            }
        ],
        execute: function () {
            LinkAnalyzer = class LinkAnalyzer extends AbstractAnalyzer_1.AbstractAnalyzer {
                analyze(node) {
                    let isLink = node.localName === "a" && !/javascript:|^#?$/.test(node.getAttribute("href") || "");
                    return isLink;
                }
                getRole() {
                    return "link";
                }
            };
            exports_4("LinkAnalyzer", LinkAnalyzer);
        }
    };
});
System.register("speak/LabelledSpeaker", [], function (exports_5, context_5) {
    var __moduleName = context_5 && context_5.id;
    var LabelledSpeaker;
    return {
        setters: [],
        execute: function () {
            LabelledSpeaker = class LabelledSpeaker {
                getText(node) {
                    let text = node.getAttribute("aria-label");
                    // * add aria-labelledby and aria-describedby
                    return text;
                }
            };
            exports_5("LabelledSpeaker", LabelledSpeaker);
        }
    };
});
System.register("speak/TextSpeaker", [], function (exports_6, context_6) {
    var __moduleName = context_6 && context_6.id;
    var TextSpeaker;
    return {
        setters: [],
        execute: function () {
            TextSpeaker = class TextSpeaker {
                constructor(labelledSpeaker) {
                    this.labelledSpeaker = labelledSpeaker;
                }
                getText(node) {
                    let text = this.labelledSpeaker.getText(node)
                        || (node.title
                            || node.innerText
                            || node.textContent // like svg
                            || node.getAttribute("value") // like inputs
                            || "").trim().replace(/\n+/g, ". ");
                    return text ? `${text}.` : ``;
                }
            };
            exports_6("TextSpeaker", TextSpeaker);
        }
    };
});
System.register("speak/LinkSpeaker", [], function (exports_7, context_7) {
    var __moduleName = context_7 && context_7.id;
    var LinkSpeaker;
    return {
        setters: [],
        execute: function () {
            LinkSpeaker = class LinkSpeaker {
                constructor(textSpeaker) {
                    this.textSpeaker = textSpeaker;
                }
                getText(node) {
                    let text = this.textSpeaker.getText(node);
                    return `Link..` + (text ? ` ${text}` : '');
                }
            };
            exports_7("LinkSpeaker", LinkSpeaker);
        }
    };
});
System.register("analyze/ButtonAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_8, context_8) {
    var __moduleName = context_8 && context_8.id;
    var AbstractAnalyzer_2, ButtonAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_2_1) {
                AbstractAnalyzer_2 = AbstractAnalyzer_2_1;
            }
        ],
        execute: function () {
            ButtonAnalyzer = class ButtonAnalyzer extends AbstractAnalyzer_2.AbstractAnalyzer {
                analyze(node) {
                    let isButton = node.localName === "button" || node.localName === "a"
                        || this.isInputButton(node)
                        || !!node.onclick
                        || !!node.getAttribute("ng-click") // angular leaves trace - unfortunately react nor vue do that
                        || this.isButtonString(node.className) || this.isButtonString(node.id);
                    return isButton;
                }
                getRole() {
                    return "button";
                }
                isInputButton(node) {
                    let isButton = false;
                    if (node.localName === "input") {
                        let type = node.type;
                        isButton = type === "button" || type === "submit";
                    }
                    return isButton;
                }
                isButtonString(value) {
                    return /button|btn|click/i.test(value);
                }
            };
            exports_8("ButtonAnalyzer", ButtonAnalyzer);
        }
    };
});
System.register("speak/ButtonSpeaker", [], function (exports_9, context_9) {
    var __moduleName = context_9 && context_9.id;
    var ButtonSpeaker;
    return {
        setters: [],
        execute: function () {
            ButtonSpeaker = class ButtonSpeaker {
                constructor(textSpeaker) {
                    this.textSpeaker = textSpeaker;
                }
                getText(node) {
                    let text = this.textSpeaker.getText(node);
                    return `Button..` + (text ? ` ${text}` : '');
                }
            };
            exports_9("ButtonSpeaker", ButtonSpeaker);
        }
    };
});
System.register("analyze/TextAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_10, context_10) {
    var __moduleName = context_10 && context_10.id;
    var AbstractAnalyzer_3, TextAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_3_1) {
                AbstractAnalyzer_3 = AbstractAnalyzer_3_1;
            }
        ],
        execute: function () {
            TextAnalyzer = class TextAnalyzer extends AbstractAnalyzer_3.AbstractAnalyzer {
                analyze(node) {
                    if (node.getAttribute("aria-label") || node.title) {
                        return true;
                    }
                    for (let i = 0; i < node.childNodes.length; i++) {
                        let childNode = node.childNodes[i];
                        if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim()) {
                            // only if this has direct text nodes, speak them out
                            return true;
                        }
                    }
                    return false;
                }
                getRole() {
                    return "text";
                }
            };
            exports_10("TextAnalyzer", TextAnalyzer);
        }
    };
});
System.register("speak/NullSpeaker", [], function (exports_11, context_11) {
    var __moduleName = context_11 && context_11.id;
    var NullSpeaker;
    return {
        setters: [],
        execute: function () {
            NullSpeaker = class NullSpeaker {
                getText(node) {
                    return "";
                }
            };
            exports_11("NullSpeaker", NullSpeaker);
        }
    };
});
System.register("analyze/TrueAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_12, context_12) {
    var __moduleName = context_12 && context_12.id;
    var AbstractAnalyzer_4, TrueAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_4_1) {
                AbstractAnalyzer_4 = AbstractAnalyzer_4_1;
            }
        ],
        execute: function () {
            TrueAnalyzer = class TrueAnalyzer extends AbstractAnalyzer_4.AbstractAnalyzer {
                analyze(node) {
                    // this should be a wildcard - always returns yes if it gets here
                    return true;
                }
                getRole() {
                    return "";
                }
            };
            exports_12("TrueAnalyzer", TrueAnalyzer);
        }
    };
});
System.register("analyze/HiddenAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_13, context_13) {
    var __moduleName = context_13 && context_13.id;
    var AbstractAnalyzer_5, HiddenAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_5_1) {
                AbstractAnalyzer_5 = AbstractAnalyzer_5_1;
            }
        ],
        execute: function () {
            HiddenAnalyzer = class HiddenAnalyzer extends AbstractAnalyzer_5.AbstractAnalyzer {
                analyze(node) {
                    return node.getAttribute("aria-hidden") === "true" || this.isHidden(node);
                }
                getRole() {
                    return "presentation";
                }
                isHidden(node) {
                    // see http://stackoverflow.com/a/36267487
                    return !node.offsetParent && node.offsetWidth === 0 && node.offsetHeight === 0;
                }
            };
            exports_13("HiddenAnalyzer", HiddenAnalyzer);
        }
    };
});
System.register("analyze/ImageAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_14, context_14) {
    var __moduleName = context_14 && context_14.id;
    var AbstractAnalyzer_6, ImageAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_6_1) {
                AbstractAnalyzer_6 = AbstractAnalyzer_6_1;
            }
        ],
        execute: function () {
            ImageAnalyzer = class ImageAnalyzer extends AbstractAnalyzer_6.AbstractAnalyzer {
                constructor(window) {
                    super();
                    this.window = window;
                }
                analyze(node) {
                    let isImage = node.localName === "img";
                    if (!isImage && !node.innerText) {
                        // only if it has no text then we should check if it has a background image
                        let computedStyle = this.window.getComputedStyle(node); // it doesn't always forces a reflow. see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
                        if (computedStyle) {
                            isImage = this.hasImageUrl(computedStyle.backgroundImage) || this.hasImageUrl(computedStyle.background);
                        }
                    }
                    return isImage;
                }
                getRole() {
                    return "img";
                }
                hasImageUrl(style) {
                    return style.indexOf("url(") !== -1;
                }
            };
            exports_14("ImageAnalyzer", ImageAnalyzer);
        }
    };
});
System.register("speak/ImageSpeaker", [], function (exports_15, context_15) {
    var __moduleName = context_15 && context_15.id;
    var ImageSpeaker;
    return {
        setters: [],
        execute: function () {
            ImageSpeaker = class ImageSpeaker {
                constructor(labelledSpeaker) {
                    this.labelledSpeaker = labelledSpeaker;
                }
                getText(node) {
                    let text = this.labelledSpeaker.getText(node) || node.title || node.alt;
                    return `Image..` + (text ? ` ${text}.` : ``);
                }
            };
            exports_15("ImageSpeaker", ImageSpeaker);
        }
    };
});
System.register("analyze/CheckboxAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_16, context_16) {
    var __moduleName = context_16 && context_16.id;
    var AbstractAnalyzer_7, CheckboxAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_7_1) {
                AbstractAnalyzer_7 = AbstractAnalyzer_7_1;
            }
        ],
        execute: function () {
            CheckboxAnalyzer = class CheckboxAnalyzer extends AbstractAnalyzer_7.AbstractAnalyzer {
                analyze(node) {
                    let isCheckbox = node.localName === "input" && node.getAttribute("type") === "checkbox";
                    return isCheckbox;
                }
                getRole() {
                    return "checkbox";
                }
            };
            exports_16("CheckboxAnalyzer", CheckboxAnalyzer);
        }
    };
});
System.register("speak/InputSpeaker", [], function (exports_17, context_17) {
    var __moduleName = context_17 && context_17.id;
    var InputSpeaker;
    return {
        setters: [],
        execute: function () {
            InputSpeaker = class InputSpeaker {
                constructor(labelledSpeaker) {
                    this.labelledSpeaker = labelledSpeaker;
                }
                getText(node) {
                    let text = this.labelledSpeaker.getText(node)
                        || (node.name ? `${node.name}.` : ``);
                    return text;
                }
            };
            exports_17("InputSpeaker", InputSpeaker);
        }
    };
});
System.register("speak/CheckboxSpeaker", [], function (exports_18, context_18) {
    var __moduleName = context_18 && context_18.id;
    var CheckboxSpeaker;
    return {
        setters: [],
        execute: function () {
            CheckboxSpeaker = class CheckboxSpeaker {
                constructor(inputSpeaker) {
                    this.inputSpeaker = inputSpeaker;
                }
                getText(node) {
                    let inputText = this.inputSpeaker.getText(node);
                    let isChecked = this.isChecked(node);
                    let checkedText = ` Currently ${isChecked ? "" : "not "}Checked.`;
                    return `Checkbox.. ` + inputText + checkedText;
                }
                isChecked(node) {
                    let isChecked;
                    let isAriaChecked = node.getAttribute("aria-checked");
                    if (isAriaChecked === "false" || isAriaChecked === "true") {
                        isChecked = isAriaChecked === "true";
                    }
                    else {
                        isChecked = node.checked;
                    }
                    return isChecked;
                }
            };
            exports_18("CheckboxSpeaker", CheckboxSpeaker);
        }
    };
});
System.register("analyze/InputAnalyzer", ["analyze/AbstractAnalyzer"], function (exports_19, context_19) {
    var __moduleName = context_19 && context_19.id;
    var AbstractAnalyzer_8, InputAnalyzer;
    return {
        setters: [
            function (AbstractAnalyzer_8_1) {
                AbstractAnalyzer_8 = AbstractAnalyzer_8_1;
            }
        ],
        execute: function () {
            InputAnalyzer = class InputAnalyzer extends AbstractAnalyzer_8.AbstractAnalyzer {
                analyze(node) {
                    return node.localName === "input";
                }
                getRole() {
                    return "textbox";
                }
            };
            exports_19("InputAnalyzer", InputAnalyzer);
        }
    };
});
System.register("speak/InputTextSpeaker", [], function (exports_20, context_20) {
    var __moduleName = context_20 && context_20.id;
    var InputTextSpeaker;
    return {
        setters: [],
        execute: function () {
            InputTextSpeaker = class InputTextSpeaker {
                constructor(inputSpeaker) {
                    this.inputSpeaker = inputSpeaker;
                }
                getText(node) {
                    let inputText = this.inputSpeaker.getText(node);
                    let typeText = node.type;
                    let placeholder = node.placeholder;
                    let placeholderText = placeholder ? ` Placeholder is: ${placeholder}.` : '';
                    let value = node.value;
                    let valueText = value ? ` Current value is: ${value}.` : ``;
                    return `${typeText} input.. ` + inputText + placeholderText + valueText;
                }
            };
            exports_20("InputTextSpeaker", InputTextSpeaker);
        }
    };
});
System.register("bootstrap/AnalyzeToSpeakMapper", ["analyze/LinkAnalyzer", "speak/LinkSpeaker", "analyze/ButtonAnalyzer", "speak/ButtonSpeaker", "analyze/TextAnalyzer", "speak/TextSpeaker", "speak/NullSpeaker", "analyze/TrueAnalyzer", "analyze/HiddenAnalyzer", "analyze/ImageAnalyzer", "speak/ImageSpeaker", "analyze/CheckboxAnalyzer", "speak/CheckboxSpeaker", "speak/LabelledSpeaker", "speak/InputSpeaker", "analyze/InputAnalyzer", "speak/InputTextSpeaker"], function (exports_21, context_21) {
    var __moduleName = context_21 && context_21.id;
    var LinkAnalyzer_1, LinkSpeaker_1, ButtonAnalyzer_1, ButtonSpeaker_1, TextAnalyzer_1, TextSpeaker_1, NullSpeaker_1, TrueAnalyzer_1, HiddenAnalyzer_1, ImageAnalyzer_1, ImageSpeaker_1, CheckboxAnalyzer_1, CheckboxSpeaker_1, LabelledSpeaker_1, InputSpeaker_1, InputAnalyzer_1, InputTextSpeaker_1, AnalyzeToSpeakMapper;
    return {
        setters: [
            function (LinkAnalyzer_1_1) {
                LinkAnalyzer_1 = LinkAnalyzer_1_1;
            },
            function (LinkSpeaker_1_1) {
                LinkSpeaker_1 = LinkSpeaker_1_1;
            },
            function (ButtonAnalyzer_1_1) {
                ButtonAnalyzer_1 = ButtonAnalyzer_1_1;
            },
            function (ButtonSpeaker_1_1) {
                ButtonSpeaker_1 = ButtonSpeaker_1_1;
            },
            function (TextAnalyzer_1_1) {
                TextAnalyzer_1 = TextAnalyzer_1_1;
            },
            function (TextSpeaker_1_1) {
                TextSpeaker_1 = TextSpeaker_1_1;
            },
            function (NullSpeaker_1_1) {
                NullSpeaker_1 = NullSpeaker_1_1;
            },
            function (TrueAnalyzer_1_1) {
                TrueAnalyzer_1 = TrueAnalyzer_1_1;
            },
            function (HiddenAnalyzer_1_1) {
                HiddenAnalyzer_1 = HiddenAnalyzer_1_1;
            },
            function (ImageAnalyzer_1_1) {
                ImageAnalyzer_1 = ImageAnalyzer_1_1;
            },
            function (ImageSpeaker_1_1) {
                ImageSpeaker_1 = ImageSpeaker_1_1;
            },
            function (CheckboxAnalyzer_1_1) {
                CheckboxAnalyzer_1 = CheckboxAnalyzer_1_1;
            },
            function (CheckboxSpeaker_1_1) {
                CheckboxSpeaker_1 = CheckboxSpeaker_1_1;
            },
            function (LabelledSpeaker_1_1) {
                LabelledSpeaker_1 = LabelledSpeaker_1_1;
            },
            function (InputSpeaker_1_1) {
                InputSpeaker_1 = InputSpeaker_1_1;
            },
            function (InputAnalyzer_1_1) {
                InputAnalyzer_1 = InputAnalyzer_1_1;
            },
            function (InputTextSpeaker_1_1) {
                InputTextSpeaker_1 = InputTextSpeaker_1_1;
            }
        ],
        execute: function () {
            AnalyzeToSpeakMapper = class AnalyzeToSpeakMapper {
                getMap() {
                    // the order of the items is the order that nodes are being analyzed until one of them is truthy
                    let map = new Map();
                    let nullSpeaker = new NullSpeaker_1.NullSpeaker();
                    let labelledSpeaker = new LabelledSpeaker_1.LabelledSpeaker();
                    let textSpeaker = new TextSpeaker_1.TextSpeaker(labelledSpeaker);
                    let inputSpeaker = new InputSpeaker_1.InputSpeaker(labelledSpeaker);
                    map.set(new HiddenAnalyzer_1.HiddenAnalyzer(), nullSpeaker);
                    map.set(new LinkAnalyzer_1.LinkAnalyzer(), new LinkSpeaker_1.LinkSpeaker(textSpeaker));
                    map.set(new ButtonAnalyzer_1.ButtonAnalyzer(), new ButtonSpeaker_1.ButtonSpeaker(textSpeaker));
                    map.set(new ImageAnalyzer_1.ImageAnalyzer(window), new ImageSpeaker_1.ImageSpeaker(labelledSpeaker));
                    map.set(new CheckboxAnalyzer_1.CheckboxAnalyzer(), new CheckboxSpeaker_1.CheckboxSpeaker(inputSpeaker));
                    map.set(new InputAnalyzer_1.InputAnalyzer(), new InputTextSpeaker_1.InputTextSpeaker(inputSpeaker));
                    map.set(new TextAnalyzer_1.TextAnalyzer(), textSpeaker);
                    // wildcard - always last and will catch everything that wasn't handled
                    map.set(new TrueAnalyzer_1.TrueAnalyzer(), nullSpeaker);
                    return map;
                }
            };
            exports_21("AnalyzeToSpeakMapper", AnalyzeToSpeakMapper);
        }
    };
});
System.register("patterns/chain-of-responsibility/ChainMaker", [], function (exports_22, context_22) {
    var __moduleName = context_22 && context_22.id;
    var ChainMaker;
    return {
        setters: [],
        execute: function () {
            ChainMaker = class ChainMaker {
                makeChain(iterator) {
                    let firstLink;
                    let prevLink;
                    for (let link of iterator) {
                        if (!prevLink) {
                            firstLink = link;
                        }
                        else {
                            prevLink.setSuccessor(link);
                        }
                        prevLink = link;
                    }
                    return firstLink;
                }
            };
            exports_22("ChainMaker", ChainMaker);
        }
    };
});
System.register("output/AbstractOutputHandler", [], function (exports_23, context_23) {
    var __moduleName = context_23 && context_23.id;
    var AbstractOutputHandler;
    return {
        setters: [],
        execute: function () {
            AbstractOutputHandler = class AbstractOutputHandler {
                constructor(window) {
                    this.window = window;
                }
                init() { }
                ;
            };
            exports_23("AbstractOutputHandler", AbstractOutputHandler);
        }
    };
});
System.register("output/SpeechSynthesisUtteranceOutputHandler", ["output/AbstractOutputHandler"], function (exports_24, context_24) {
    var __moduleName = context_24 && context_24.id;
    var AbstractOutputHandler_1, SpeechSynthesisUtteranceOutputHandler;
    return {
        setters: [
            function (AbstractOutputHandler_1_1) {
                AbstractOutputHandler_1 = AbstractOutputHandler_1_1;
            }
        ],
        execute: function () {
            SpeechSynthesisUtteranceOutputHandler = class SpeechSynthesisUtteranceOutputHandler extends AbstractOutputHandler_1.AbstractOutputHandler {
                init() {
                    window.speechSynthesis.getVoices();
                }
                output(text) {
                    console.info("Saying:", text);
                    var msg = new this.window.SpeechSynthesisUtterance(text);
                    msg.voice = window.speechSynthesis.getVoices()[17];
                    window.speechSynthesis.speak(msg);
                }
                abort() {
                    window.speechSynthesis.cancel();
                }
            };
            exports_24("SpeechSynthesisUtteranceOutputHandler", SpeechSynthesisUtteranceOutputHandler);
        }
    };
});
System.register("input/AbstractInputHandler", [], function (exports_25, context_25) {
    var __moduleName = context_25 && context_25.id;
    var AbstractInputHandler;
    return {
        setters: [],
        execute: function () {
            AbstractInputHandler = class AbstractInputHandler {
                constructor(window, outputHandler, analyzer, analyzeToSpeakMap) {
                    this.window = window;
                    this.outputHandler = outputHandler;
                    this.analyzer = analyzer;
                    this.analyzeToSpeakMap = analyzeToSpeakMap;
                }
                getSpeakText(element) {
                    let usedAnalyzer = this.analyzer.handle(element);
                    let speaker = this.analyzeToSpeakMap.get(usedAnalyzer);
                    let speakText = speaker.getText(element);
                    return speakText;
                }
            };
            exports_25("AbstractInputHandler", AbstractInputHandler);
        }
    };
});
System.register("input/AbstractEventInputHandler", ["input/AbstractInputHandler"], function (exports_26, context_26) {
    var __moduleName = context_26 && context_26.id;
    var AbstractInputHandler_1, AbstractEventInputHandler;
    return {
        setters: [
            function (AbstractInputHandler_1_1) {
                AbstractInputHandler_1 = AbstractInputHandler_1_1;
            }
        ],
        execute: function () {
            AbstractEventInputHandler = class AbstractEventInputHandler extends AbstractInputHandler_1.AbstractInputHandler {
                enableInput() {
                    this.eventHandler = this.eventHandler.bind(this);
                    this.window.addEventListener(this.getEventName(), this.eventHandler);
                }
                disableInput() {
                    this.window.removeEventListener(this.getEventName(), this.eventHandler);
                }
                handleEvent(event) {
                    let target = event.target;
                    let speakText = this.getSpeakText(target);
                    if (speakText) {
                        // since this is on-demand action, we want to abort anything prior to it
                        this.outputHandler.abort();
                        this.outputHandler.output(speakText);
                    }
                }
            };
            exports_26("AbstractEventInputHandler", AbstractEventInputHandler);
        }
    };
});
System.register("input/MouseMoveInputHandler", ["input/AbstractEventInputHandler"], function (exports_27, context_27) {
    var __moduleName = context_27 && context_27.id;
    var AbstractEventInputHandler_1, MouseMoveInputHandler;
    return {
        setters: [
            function (AbstractEventInputHandler_1_1) {
                AbstractEventInputHandler_1 = AbstractEventInputHandler_1_1;
            }
        ],
        execute: function () {
            MouseMoveInputHandler = class MouseMoveInputHandler extends AbstractEventInputHandler_1.AbstractEventInputHandler {
                eventHandler(event) {
                    this.handleEvent(event);
                }
                getEventName() {
                    return "mouseover";
                }
            };
            exports_27("MouseMoveInputHandler", MouseMoveInputHandler);
        }
    };
});
System.register("input/TabInputHandler", ["input/AbstractEventInputHandler"], function (exports_28, context_28) {
    var __moduleName = context_28 && context_28.id;
    var AbstractEventInputHandler_2, TAB_KEYCODE, TabInputHandler;
    return {
        setters: [
            function (AbstractEventInputHandler_2_1) {
                AbstractEventInputHandler_2 = AbstractEventInputHandler_2_1;
            }
        ],
        execute: function () {
            TAB_KEYCODE = 9;
            TabInputHandler = class TabInputHandler extends AbstractEventInputHandler_2.AbstractEventInputHandler {
                eventHandler(event) {
                    if (event.which === TAB_KEYCODE) {
                        this.handleEvent(event);
                    }
                }
                getEventName() {
                    return "keyup";
                }
            };
            exports_28("TabInputHandler", TabInputHandler);
        }
    };
});
System.register("mutation-handlers/AbstractMutationHandler", [], function (exports_29, context_29) {
    var __moduleName = context_29 && context_29.id;
    var AbstractMutationHandler;
    return {
        setters: [],
        execute: function () {
            AbstractMutationHandler = class AbstractMutationHandler {
                handle(mutation, elementsModified) {
                    let insertedElements = this.analyze(mutation, elementsModified);
                    if (!insertedElements && this.successor) {
                        this.successor.handle(mutation, elementsModified);
                    }
                }
                setSuccessor(successor) {
                    this.successor = successor;
                }
            };
            exports_29("AbstractMutationHandler", AbstractMutationHandler);
            ;
        }
    };
});
System.register("input/MutationObserverInputHandler", ["input/AbstractInputHandler"], function (exports_30, context_30) {
    var __moduleName = context_30 && context_30.id;
    var AbstractInputHandler_2, MutationObserverInputHandler;
    return {
        setters: [
            function (AbstractInputHandler_2_1) {
                AbstractInputHandler_2 = AbstractInputHandler_2_1;
            }
        ],
        execute: function () {
            MutationObserverInputHandler = class MutationObserverInputHandler extends AbstractInputHandler_2.AbstractInputHandler {
                constructor(window, outputHandler, analyzer, analyzeToSpeakMap, mutationHandler) {
                    super(window, outputHandler, analyzer, analyzeToSpeakMap);
                    this.window = window;
                    this.outputHandler = outputHandler;
                    this.analyzer = analyzer;
                    this.analyzeToSpeakMap = analyzeToSpeakMap;
                    this.mutationHandler = mutationHandler;
                }
                enableInput() {
                    this.observer = new this.window.MutationObserver(this.mutationOccurred.bind(this));
                    this.observer.observe(this.window.document, {
                        childList: true,
                        attributes: true,
                        characterData: true,
                        subtree: true,
                        attributeOldValue: true,
                        characterDataOldValue: true,
                    });
                }
                mutationOccurred(mutations) {
                    let elementsModified = new Set();
                    for (let mutation of mutations) {
                        this.mutationHandler.handle(mutation, elementsModified);
                    }
                    let hasSpoken = false;
                    for (let element of elementsModified) {
                        let speakText = this.getSpeakText(element);
                        if (speakText) {
                            if (!hasSpoken) {
                                this.outputHandler.abort();
                                this.outputHandler.output("Update: ");
                            }
                            hasSpoken = true;
                            this.outputHandler.output(speakText);
                        }
                    }
                }
                disableInput() {
                    this.observer.disconnect();
                }
            };
            exports_30("MutationObserverInputHandler", MutationObserverInputHandler);
        }
    };
});
System.register("bootstrap/InputListGetter", ["input/MouseMoveInputHandler", "input/TabInputHandler", "input/MutationObserverInputHandler"], function (exports_31, context_31) {
    var __moduleName = context_31 && context_31.id;
    var MouseMoveInputHandler_1, TabInputHandler_1, MutationObserverInputHandler_1, InputListGetter;
    return {
        setters: [
            function (MouseMoveInputHandler_1_1) {
                MouseMoveInputHandler_1 = MouseMoveInputHandler_1_1;
            },
            function (TabInputHandler_1_1) {
                TabInputHandler_1 = TabInputHandler_1_1;
            },
            function (MutationObserverInputHandler_1_1) {
                MutationObserverInputHandler_1 = MutationObserverInputHandler_1_1;
            }
        ],
        execute: function () {
            InputListGetter = class InputListGetter {
                constructor(window, outputHandler, analyzer, analyzeToSpeakMap, mutationHandler) {
                    this.window = window;
                    this.outputHandler = outputHandler;
                    this.analyzer = analyzer;
                    this.analyzeToSpeakMap = analyzeToSpeakMap;
                    this.mutationHandler = mutationHandler;
                }
                getList() {
                    return [
                        new MouseMoveInputHandler_1.MouseMoveInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap),
                        new TabInputHandler_1.TabInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap),
                        new MutationObserverInputHandler_1.MutationObserverInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap, this.mutationHandler),
                    ];
                }
            };
            exports_31("InputListGetter", InputListGetter);
        }
    };
});
System.register("mutation-handlers/AddedNodesMutationHandler", ["mutation-handlers/AbstractMutationHandler"], function (exports_32, context_32) {
    var __moduleName = context_32 && context_32.id;
    var AbstractMutationHandler_1, AddedNodesMutationHandler;
    return {
        setters: [
            function (AbstractMutationHandler_1_1) {
                AbstractMutationHandler_1 = AbstractMutationHandler_1_1;
            }
        ],
        execute: function () {
            AddedNodesMutationHandler = class AddedNodesMutationHandler extends AbstractMutationHandler_1.AbstractMutationHandler {
                analyze(mutation, elementsModified) {
                    this.findTextElements(mutation.addedNodes, elementsModified);
                    return mutation.addedNodes.length > 0;
                }
                findTextElements(nodes, elementsModified) {
                    for (let node of nodes) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            let parentNode = node.parentElement;
                            if (parentNode) {
                                // make sure it's not a floating text
                                elementsModified.add(parentNode);
                            }
                        }
                        else if (node.nodeType === Node.ELEMENT_NODE) {
                            this.findTextElements(node.childNodes, elementsModified);
                        }
                        else {
                            console.error("Detected unsupported node value! this needs to be handled", node);
                        }
                    }
                }
            };
            exports_32("AddedNodesMutationHandler", AddedNodesMutationHandler);
            ;
        }
    };
});
System.register("mutation-handlers/TextMutationHandler", ["mutation-handlers/AbstractMutationHandler"], function (exports_33, context_33) {
    var __moduleName = context_33 && context_33.id;
    var AbstractMutationHandler_2, TextMutationHandler;
    return {
        setters: [
            function (AbstractMutationHandler_2_1) {
                AbstractMutationHandler_2 = AbstractMutationHandler_2_1;
            }
        ],
        execute: function () {
            TextMutationHandler = class TextMutationHandler extends AbstractMutationHandler_2.AbstractMutationHandler {
                analyze(mutation, elementsModified) {
                    let isText = mutation.type === "characterData";
                    if (isText) {
                        let parentNode = mutation.target.parentElement;
                        if (parentNode) {
                            // make sure it's not a floating text
                            elementsModified.add(parentNode);
                        }
                    }
                    return isText;
                }
            };
            exports_33("TextMutationHandler", TextMutationHandler);
            ;
        }
    };
});
System.register("bootstrap/MutationHandlersListGetter", ["mutation-handlers/AddedNodesMutationHandler", "mutation-handlers/TextMutationHandler"], function (exports_34, context_34) {
    var __moduleName = context_34 && context_34.id;
    var AddedNodesMutationHandler_1, TextMutationHandler_1, MutationHandlersListGetter;
    return {
        setters: [
            function (AddedNodesMutationHandler_1_1) {
                AddedNodesMutationHandler_1 = AddedNodesMutationHandler_1_1;
            },
            function (TextMutationHandler_1_1) {
                TextMutationHandler_1 = TextMutationHandler_1_1;
            }
        ],
        execute: function () {
            MutationHandlersListGetter = class MutationHandlersListGetter {
                getList() {
                    return [
                        new AddedNodesMutationHandler_1.AddedNodesMutationHandler(),
                        new TextMutationHandler_1.TextMutationHandler(),
                    ];
                }
            };
            exports_34("MutationHandlersListGetter", MutationHandlersListGetter);
        }
    };
});
System.register("bootstrap/Bootstrap", ["bootstrap/AnalyzeToSpeakMapper", "patterns/chain-of-responsibility/ChainMaker", "output/SpeechSynthesisUtteranceOutputHandler", "bootstrap/InputListGetter", "bootstrap/MutationHandlersListGetter"], function (exports_35, context_35) {
    var __moduleName = context_35 && context_35.id;
    var AnalyzeToSpeakMapper_1, ChainMaker_1, SpeechSynthesisUtteranceOutputHandler_1, InputListGetter_1, MutationHandlersListGetter_1, Bootstrap;
    return {
        setters: [
            function (AnalyzeToSpeakMapper_1_1) {
                AnalyzeToSpeakMapper_1 = AnalyzeToSpeakMapper_1_1;
            },
            function (ChainMaker_1_1) {
                ChainMaker_1 = ChainMaker_1_1;
            },
            function (SpeechSynthesisUtteranceOutputHandler_1_1) {
                SpeechSynthesisUtteranceOutputHandler_1 = SpeechSynthesisUtteranceOutputHandler_1_1;
            },
            function (InputListGetter_1_1) {
                InputListGetter_1 = InputListGetter_1_1;
            },
            function (MutationHandlersListGetter_1_1) {
                MutationHandlersListGetter_1 = MutationHandlersListGetter_1_1;
            }
        ],
        execute: function () {
            Bootstrap = class Bootstrap {
                init() {
                    let speechSynthesisUtteranceOutputHandler = new SpeechSynthesisUtteranceOutputHandler_1.SpeechSynthesisUtteranceOutputHandler(window);
                    speechSynthesisUtteranceOutputHandler.init();
                    let analyzeToSpeakMap = new AnalyzeToSpeakMapper_1.AnalyzeToSpeakMapper().getMap();
                    let chainMaker = new ChainMaker_1.ChainMaker();
                    let initialAnalyzer = chainMaker.makeChain(analyzeToSpeakMap.keys());
                    let initialMutationHandler = chainMaker.makeChain(new MutationHandlersListGetter_1.MutationHandlersListGetter().getList());
                    let inputList = new InputListGetter_1.InputListGetter(window, speechSynthesisUtteranceOutputHandler, initialAnalyzer, analyzeToSpeakMap, initialMutationHandler).getList();
                    for (let input of inputList) {
                        input.enableInput();
                    }
                }
            };
            exports_35("Bootstrap", Bootstrap);
        }
    };
});
System.register("Main", ["bootstrap/Bootstrap"], function (exports_36, context_36) {
    var __moduleName = context_36 && context_36.id;
    var Bootstrap_1;
    return {
        setters: [
            function (Bootstrap_1_1) {
                Bootstrap_1 = Bootstrap_1_1;
            }
        ],
        execute: function () {
            new Bootstrap_1.Bootstrap().init();
        }
    };
});
