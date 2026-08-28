# Minoj Filmscape

СТОП. НЕ ПЫТАЙСЯ ПОДПРАВИТЬ ТЕКУЩИЙ ДИЗАЙН.

Текущий результат технически рабочий, но визуально он слишком явно выглядит как AI-generated landing page.

НУЖНА ПОЛНАЯ ПЕРЕРАБОТКА ART DIRECTION С НУЛЯ.

Не исправляй отдельные элементы. Пересмотри всю визуальную систему, композицию и способ повествования страницы.

Я хочу, чтобы ты сначала критически проанализировал текущий результат, а затем полностью заменил его там, где он выглядит шаблонным.

ГЛАВНАЯ ПРОБЛЕМА

Сейчас сайт пытается выглядеть «дорого» через очевидные декоративные приёмы:

— gold glow;
— oversized serif;
— decorative grid;
— floating cards;
— тонкие линии;
— random labels;
— маленькие metadata;
— luxury-style UI.

Это НЕ premium design.

Это визуальный набор клише.

УДАЛИ ЭТОТ ПОДХОД.

Не добавляй ещё больше декоративных элементов.

Наоборот — убери всё лишнее.

Премиальность должна появляться из:

— art direction;
— typography;
— photography;
— spacing;
— composition;
— scale;
— pacing;
— transitions;
— materiality;
— restraint.

КРИТИЧЕСКИ ВАЖНО

НЕ ПЫТАЙСЯ СОЗДАТЬ ВСЕ КОМПОНЕНТЫ С НУЛЯ, ЕСЛИ У ТЕБЯ НЕТ СИЛЬНОГО ВИЗУАЛЬНОГО РЕШЕНИЯ.

Используй существующие качественные React-компоненты и animation primitives как строительные блоки.

Исследуй:

React Bits
Aceternity UI
Magic UI
Motion / Framer Motion examples
GSAP
Lenis

Но:

НЕ КОПИРУЙ ИХ DEFAULT VISUAL STYLE.

Особенно НЕ используй:

— aurora;
— gradient blobs;
— purple/blue gradients;
— glowing borders;
— spotlight backgrounds;
— excessive particles;
— generic 3D;
— glassmorphism;
— tech/SaaS aesthetics.

Если компонент из библиотеки выглядит как типичный AI landing page — НЕ ИСПОЛЬЗУЙ ЕГО.

Используй только те primitives, которые можно органично интегрировать в Minoj.

ИЗМЕНИ САМ ПРИНЦИП ДИЗАЙНА

Не создавай страницу из отдельных готовых sections.

Создай одну continuous visual composition.

Сайт должен ощущаться как короткий авторский фильм о Minoj.

Когда пользователь скроллит:

не должно быть ощущения:

HERO
↓
ABOUT
↓
MENU
↓
GALLERY
↓
REVIEWS
↓
CONTACT

Должно ощущаться:

SCENE → SCENE → SCENE → SCENE

где конец одного визуального состояния становится началом следующего.

Секции не должны иметь очевидных границ.

ВАЖНОЕ ИЗМЕНЕНИЕ В HERO

Полностью откажись от текущего hero.

Текущая конструкция:

огромный текст
+
маленькие фотографии
+
декоративная сетка
+
gold glow

выглядит искусственно.

Не пытайся её улучшать.

Придумай совершенно другую opening scene.

Она должна основываться на реальных фотографиях Minoj и его атмосфере.

Hero не обязан объяснять всё.

Hero должен создать первое ощущение места.

Не используй стандартный:

headline
subheadline
CTA
image.

И не используй стандартную карточку фотографии справа.

ФОТОГРАФИЯ

Фотография должна стать главным инструментом дизайна.

Не помещай фотографии в карточки.

Не делай gallery grid.

Не делай одинаковые image containers.

Используй реальные фотографии Minoj настолько крупно и выразительно, насколько позволяет материал.

Позволь фотографии:

— занимать большую часть viewport;
— пересекаться с текстом;
— менять масштаб;
— плавно переходить в следующую сцену;
— появляться из-за другого элемента;
— становиться background;
— становиться foreground;
— продолжаться между несколькими viewport.

Но всё должно быть аккуратно.

ТИПОГРАФИКА

Текущий огромный serif выглядит слишком ожидаемо.

Не отказывайся от выразительной typography полностью, но пересмотри систему.

Исследуй несколько современных editorial/display fonts и выбери действительно подходящую пару.

Не используй:

Inter
Poppins
Roboto
Arial
обычные Tailwind fonts.

Но также НЕ используй просто огромный serif потому, что «Awwwards сайты используют большие serif».

Типографика должна иметь собственный характер.

COLOR

Сохрани связь с реальным визуальным характером Minoj:

charcoal / dark grey
+
deep red
+
gold.

Но не превращай это в:

black background + gold text + red glow.

Это выглядит дешево.

Используй цвет как часть narrative system.

Например, один visual state может быть почти monochrome, затем появляется тёплый цвет фотографии, затем красный становится акцентом, затем gold появляется очень дозированно.

Точные оттенки, пропорции и использование цвета определи самостоятельно после изучения материалов Minoj.

Золото НЕ должно светиться.

Никаких gold glows.

Никаких neon effects.

УДАЛИ ИЗ ТЕКУЩЕГО САЙТА

Если они не имеют реальной композиционной функции:

— decorative vertical grid;
— random gold lines;
— floating image cards;
— fake metadata;
— random coordinates;
— decorative section numbers;
— glow;
— unnecessary borders;
— ornamental UI;
— random arrows;
— excessive labels.

НЕ добавляй новые декоративные элементы вместо них.

COMPOSITION

Мне нужна настоящая editorial art direction.

Используй:

— asymmetric composition;
— unexpected scale;
— negative space;
— overlapping;
— cropped photography;
— typography integrated with imagery;
— off-grid positioning;
— deliberate imbalance;
— visual tension;
— controlled whitespace.

Но не делай «хаотичный brutalism».

Нужна controlled art direction.

Каждый объект должен выглядеть так, будто дизайнер специально поставил его именно туда.

SCROLL

Это самая важная техническая часть.

Используй:

GSAP + ScrollTrigger
+
Lenis

если это оправдано текущим stack.

GSAP используй для настоящего scroll choreography, а не просто fade-in элементов.

Создай несколько ключевых scroll moments, где:

— фотография меняет scale;
— текст перемещается;
— композиция раскрывается;
— один visual layer становится другим;
— элементы переходят между сценами;
— viewport ощущается как камера.

Но НЕ превращай страницу в animation showcase.

Motion должен быть медленным, точным и почти кинематографичным.

НЕ ДЕЛАЙ

Не используй fade-up animation для каждого блока.

Это один из самых очевидных признаков AI-generated сайта.

Не делай:

opacity 0 → opacity 1

для каждого элемента страницы.

Используй motion как часть композиции.

LIBRARIES

Перед реализацией исследуй готовые компоненты в:

React Bits
Magic UI
Aceternity UI

и выбери только действительно подходящие primitives.

Можно использовать готовые:

— text reveal;
— image reveal;
— magnetic interaction;
— smooth carousel;
— marquee;
— masked reveal;
— cursor interaction;
— scroll choreography;
— navigation transitions.

Но визуально они должны быть полностью адаптированы под Minoj.

Не вставляй компонент «как есть».

AWWWARDS

Не пытайся сделать «Awwwards style».

Это плохая цель.

Awwwards — это качество art direction, а не набор визуальных эффектов.

Используй референсы только для уровня исполнения.

Сайт должен выглядеть так, будто дизайнер Minoj вообще не думал о том, чтобы «выглядеть как Awwwards».

FINAL QUALITY TEST

После полной переделки сравни результат с текущим.

Новый вариант должен быть:

менее декоративным;
менее предсказуемым;
менее симметричным;
менее AI-looking;
более photographic;
более editorial;
более atmospheric;
более restrained;
более intentional.

Если убрать всю анимацию, дизайн всё равно должен выглядеть дорогим.

Если убрать весь текст, композиция всё равно должна работать.

Если убрать все декоративные линии, сайт не должен потерять свою идентичность.

Если ответ на эти три пункта «нет» — переделай.

ВАЖНО

Не объясняй мне, что ты собираешься делать.

Не показывай промежуточную концепцию.

Не спрашивай разрешения.

Не оставляй старый hero.

Не делай cosmetic redesign.

Сразу полностью пересобери визуальную систему.

Сначала исследуй.
Затем redesign.
Затем implementation.
Затем visual audit.
Затем исправь обнаруженные проблемы.

Используй весь доступный контекст на реализацию, а не на объяснения.

Финальный результат должен выглядеть как работа сильного independent digital designer, а не как результат prompt-to-website генератора.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/728da81e-55a1-4598-8444-1c0bdd567426).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
