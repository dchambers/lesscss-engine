/*
 * Copyright 2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.asual.lesscss;

import static org.junit.Assert.assertEquals;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.junit.BeforeClass;
import org.junit.Test;

/**
 * @author Rostislav Hristov
 */
public class LessEngineTest {
    
    private static LessEngine engine;
    
    @BeforeClass
    public static void before() {
        engine = new LessEngine();
    }
    
    @Test
    public void parse() throws LessException {
        assertEquals("div {\n  width: 2;\n}\n", engine.compile("div { width: 1 + 1 }"));
    }
    
    @Test
    public void compileToString() throws LessException, IOException {
        assertEquals("body {\n  color: #f0f0f0;\n  background-image: url(\"bg.png\");\n}\n", 
                engine.compile(getClass().getClassLoader().getResource("META-INF/test.css")));
    }
	
	private String getCss(final String cssPath) throws LessException, IOException {
		File tempDir = new File(System.getProperty("java.io.tmpdir"));
		File tempFile = File.createTempFile("less.css", null, tempDir);
		engine.compile(
			new File(getClass().getClassLoader().getResource("META-INF/" + cssPath).getPath()), 
			new File(tempFile.getAbsolutePath()));
		FileInputStream fstream = new FileInputStream(tempFile.getAbsolutePath());
		DataInputStream in = new DataInputStream(fstream);
		BufferedReader br = new BufferedReader(new InputStreamReader(in));
		String strLine;
		StringBuilder sb = new StringBuilder();
		while ((strLine = br.readLine()) != null) {
			sb.append(strLine);
		}
		in.close();
		tempFile.delete();
		 
		return sb.toString();
	}
	
	@Test
	public void compileToFile() throws LessException, IOException {
		assertEquals("body {  color: #f0f0f0;  background-image: url(\"bg.png\");}", getCss("test.css"));
	}
	
	private final String DEEP_CSS = "body {  background-image: url(\"dir1/dir2/relative.png\"), url('/host-relative.png'), url(\"//scheme-relative.png\"), url(http://acme.com/absolute.png);}";
	
	@Test
	public void deepImport() throws LessException, IOException {
		assertEquals(DEEP_CSS, getCss("deep-import.css"));
	}
	
	@Test
	public void chainedImportUsingStringNotation() throws LessException, IOException {
		assertEquals(DEEP_CSS, getCss("chained-import-using-string-notation.css"));
	}
	
	@Test
	public void chainedImportUsingUrlNotation() throws LessException, IOException {
		assertEquals(DEEP_CSS, getCss("chained-import-using-url-notation.css"));
	}
}