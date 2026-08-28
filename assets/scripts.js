// Compiled helper (ES5-compatible) to accept an uploaded plans file and render a preview into the #planes section
var uploadBtn = document.getElementById('upload-placeholder');
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function renderPlansFromJson(data) {
    var container = document.getElementById('planes');
    if (!container)
        return;
    var html = '<div class="uploaded-plans">';
    if (Array.isArray(data)) {
        html += '<ul>' + data
            .map(function (p) { return "<li><strong>" + escapeHtml(p.title || p.name || '') + "</strong>: " + escapeHtml(p.description || p.summary || '') + "</li>"; })
            .join('') + '</ul>';
    }
    else if (typeof data === 'object') {
        for (var k in data) {
            html += "<p><strong>" + escapeHtml(k) + "</strong>: " + escapeHtml(JSON.stringify(data[k])) + "</p>";
        }
    }
    else {
        html += "<pre>" + escapeHtml(String(data)) + "</pre>";
    }
    html += '</div>';
    container.insertAdjacentHTML('beforeend', html);
}
if (uploadBtn) {
    uploadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = '.json,.html,.md,.txt';
        inp.onchange = function () { return __awaiter(void 0, void 0, void 0, function () {
            var f, text, container, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        f = inp.files && inp.files[0];
                        if (!f)
                            return [2 /*return*/];
                        return [4 /*yield*/, f.text()];
                    case 1:
                        text = _a.sent();
                        container = document.getElementById('planes');
                        if (!container)
                            return [2 /*return*/];
                        if (f.name.toLowerCase().endsWith('.json')) {
                            _a.label = 2;
                        }
                        else {
                            container.insertAdjacentHTML('beforeend', "<div class=\"uploaded-plans\"><pre>" + escapeHtml(text) + "</pre></div>");
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = JSON.parse(text);
                        renderPlansFromJson(data);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        container.insertAdjacentHTML('beforeend', "<div class=\"uploaded-plans\"><pre>JSON inválido: " + escapeHtml(String(err_1)) + "</pre></div>");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        inp.click();
    });
}

// small helpers for async/await transpilation (inline, minimal)
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop(); _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
