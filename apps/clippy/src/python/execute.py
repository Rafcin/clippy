import sys
import json
import traceback
import subprocess

def install_dependency(dependency_name):
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", dependency_name])
    except Exception as e:
        print("Error installing dependency:", e)
        sys.exit(1)

def execute_code(code, input_data):
    try:
        if input_data:
            input_str = json.dumps(input_data)
            exec(f'input_data = {input_str}\n' + code, globals())
        else:
            exec(code, globals())

        # Capture the value of the variable `result`
        result = globals().get('result', None)

        # Print the result
        if result is not None:
            print(result)

    except ImportError as e:
        missing_dependency = str(e).split()[-1].strip("'")
        install_dependency(missing_dependency)
        execute_code(code, input_data)
    except Exception as e:
        print("Error executing code:", e)
        sys.exit(1)

if __name__ == "__main__":
    code = sys.argv[1]
    input_data = None
    if not sys.stdin.isatty():
        input_line = sys.stdin.readline().strip()
        if input_line != "":
            input_data = json.loads(input_line)

    execute_code(code, input_data)
